import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { resolve } from 'path';
import { Repository } from 'typeorm';
import { QueueJobs } from './constants/queue_jobs.constant';
import { Queues } from './constants/queues.constant';
import { FileEntity } from './file/entities/file.entity';
import { FileService } from './file/file.service';
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
    private readonly fileService: FileService,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async processFiles(
    files: Express.Multer.File[],
    user: Omit<UserEntity, 'password'>,
  ) {
    const savedFiles: FileEntity[] = [];
    for (const file of files) {
      file.path = resolve(file.path);
      const payload: QueuePayload = {
        file,
      };

      const fileEntity = new FileEntity({
        nameOnDisk: file.filename,
        originalName: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
        user: new UserEntity(user),
      });

      const fileEntitySavePromise = this.fileService.createFile(fileEntity);

      const jobPromise = this.fileProcessorQueue.add(
        QueueJobs.PROCESS_FILES,
        payload,
      );

      const [job, savedFileEntity] = await Promise.all([
        jobPromise,
        fileEntitySavePromise,
      ]);

      savedFiles.push({
        ...savedFileEntity,
        user: undefined,
        nameOnDisk: undefined,
      } as any);

      const jobLogEntry = new JobLogEntity({
        status: JobStatus.PENDING,
        jobId: job.id,
        file: fileEntity,
      });

      await this.jobLogRepository.save(jobLogEntry);
    }

    return {
      message: 'Files uploaded successfully, will be processed shortly.',
      files: savedFiles,
    };
  }
}
