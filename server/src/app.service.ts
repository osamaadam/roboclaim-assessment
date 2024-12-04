import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { Repository } from 'typeorm';
import { QueueJobs } from './constants/queue_jobs.constant';
import { Queues } from './constants/queues.constant';
import { JobStatus } from './processor/constants/job_status.constant';
import { FileEntity } from './processor/entities/file.entity';
import { JobLogEntity } from './processor/entities/job_log.entity';
import { QueuePayload } from './processor/types/queue_payload';
import { UserEntity } from './user/entities/user.entity';
import { resolve } from 'path';

@Injectable()
export class AppService {
  constructor(
    @InjectQueue(Queues.FILE_PROCESSOR)
    private readonly fileProcessorQueue: Queue,
    @InjectRepository(JobLogEntity)
    private readonly jobLogRepository: Repository<JobLogEntity>,
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processFiles(
    files: Express.Multer.File[],
    user: Omit<UserEntity, 'password'>,
  ) {
    for (const file of files) {
      file.path = resolve(file.path);
      const payload: QueuePayload = {
        user,
        file,
      };

      const fileEntity = new FileEntity({
        nameOnDisk: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
      });

      const fileEntitySavePromise = this.fileRepository.save(fileEntity);

      const jobPromise = this.fileProcessorQueue.add(
        QueueJobs.PROCESS_FILES,
        payload,
      );

      const [job] = await Promise.all([jobPromise, fileEntitySavePromise]);

      const jobLogEntry = new JobLogEntity({
        status: JobStatus.PENDING,
        user: new UserEntity(user),
        jobId: job.id,
        file: fileEntity,
      });

      await this.jobLogRepository.save(jobLogEntry);
    }

    return {
      message: 'Files uploaded successfully, will be processed shortly.',
      files: files.map((file) => ({
        ...file,
        filename: undefined,
      })),
    };
  }
}
