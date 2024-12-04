import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from 'bullmq';
import { QueueJobs } from 'src/constants/queue_jobs.constant';
import { Queues } from 'src/constants/queues.constant';
import { Repository } from 'typeorm';
import { JobStatus } from './constants/job_status.constant';
import { JobLogEntity } from './entities/job_log.entity';
import { QueuePayload } from './types/queue_payload';

@Processor(Queues.FILE_PROCESSOR)
export class ProcessorService extends WorkerHost {
  constructor(
    private readonly logger: Logger,
    @InjectRepository(JobLogEntity)
    private readonly jobLogRepository: Repository<JobLogEntity>,
  ) {
    super();
  }

  async process(job: Job<QueuePayload, any, QueueJobs>) {
    for (const file of job.data.files) {
      try {
        await this.__preProcess(job);

        this.logger.log(
          `Processing file ${file.originalname} for user: ${job.data.user.username}`,
        );

        await this.__postProcess(job);
      } catch (err: any) {
        await this.__handleError(job, err);
      }
    }
  }

  private async __preProcess(job: Job<QueuePayload, any, QueueJobs>) {
    return this.jobLogRepository.update(
      { jobId: job.id },
      { status: JobStatus.PROCESSING },
    );
  }

  private async __postProcess(job: Job<QueuePayload, any, QueueJobs>) {
    return this.jobLogRepository.update(
      { jobId: job.id },
      { status: JobStatus.COMPLETED },
    );
  }

  private async __handleError(
    job: Job<QueuePayload, any, QueueJobs>,
    err: any,
  ) {
    this.logger.error(
      {
        message: err.message,
        jobId: job.id,
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
