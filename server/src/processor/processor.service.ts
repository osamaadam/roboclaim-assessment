import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { basename } from 'path';
import { QueueJobs } from 'src/constants/queue_jobs.constant';
import { Queues } from 'src/constants/queues.constant';
import { Repository } from 'typeorm';
import { JobStatus } from './constants/job_status.constant';
import { JobLogEntity } from './entities/job_log.entity';
import { ProcessorFactoryService } from './processors/processor_factory.service';
import { QueuePayload } from './types/queue_payload';

type ProcessFileJob = Job<QueuePayload, any, QueueJobs>;

@Processor(Queues.FILE_PROCESSOR)
export class ProcessorService extends WorkerHost {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(JobLogEntity)
    private readonly jobLogRepository: Repository<JobLogEntity>,
    private readonly processorFactory: ProcessorFactoryService,
  ) {
    super();
  }

  async process(job: ProcessFileJob) {
    try {
      await this.__preProcess(job);
      const { file } = job.data;

      await this.processorFactory.createProcessor(file).process(file);

      await this.__postProcess(job);
    } catch (err: any) {
      await this.__handleError(job, err);
    }
  }

  private async __preProcess(job: ProcessFileJob) {
    await this.jobLogRepository.update(
      { jobId: job.id },
      { status: JobStatus.PROCESSING },
    );

    this.logger.log({
      message: `Started processing job ${job.id}`,
      jobId: job.id,
      file: basename(job.data.file.path),
    });
  }

  private async __postProcess(job: ProcessFileJob) {
    await this.jobLogRepository.update(
      { jobId: job.id },
      { status: JobStatus.COMPLETED },
    );

    this.logger.log({
      message: `Finished processing job ${job.id}`,
      jobId: job.id,
      file: basename(job.data.file.path),
    });
  }

  private async __handleError(job: ProcessFileJob, err: any) {
    this.logger.error(
      {
        message: err.message,
        jobId: job.id,
        file: basename(job.data.file.path),
      },
      err.stack,
      ProcessorService.name,
    );

    return this.jobLogRepository.update(
      { jobId: job.id },
      { status: JobStatus.FAILED, error: err.message },
    );
  }
}
