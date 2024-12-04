import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { QueueJobs } from './constants/queue_jobs.constant';
import { Queues } from './constants/queues.constant';
import { JobStatus } from './processor/constants/job_status.constant';
import { JobLogEntity } from './processor/entities/job_log.entity';
import { QueuePayload } from './processor/types/queue_payload';
import { UserEntity } from './user/entities/user.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(Queues.FILE_PROCESSOR)
    private readonly fileProcessorQueue: Queue,
    @InjectRepository(JobLogEntity)
    private readonly jobLogRepository: Repository<JobLogEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processFiles(
    files: Express.Multer.File[],
    user: Omit<UserEntity, 'password'>,
  ) {
    const payload: QueuePayload = {
      user,
      files,
    };

    const job = await this.fileProcessorQueue.add(
      QueueJobs.PROCESS_FILES,
      payload,
    );

    const logEntries = files.map((file) => {
      return new JobLogEntity({
        fileName: file.originalname,
        status: JobStatus.PENDING,
        user: new UserEntity(user),
        jobId: job.id,
        mimetype: file.mimetype,
      });
    });

    await this.jobLogRepository.save(logEntries);

    return {
      message: 'Files uploaded successfully, will be processed shortly.',
      files: files.map((file) => ({
        ...file,
        filename: undefined,
      })),
    };
  }
}
