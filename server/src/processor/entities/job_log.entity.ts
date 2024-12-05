import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { FileEntity } from '../../file/entities/file.entity';
import { JobStatus } from '../constants/job_status.constant';

@Entity('job_log')
export class JobLogEntity {
  constructor(data: Partial<JobLogEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'job_id' })
  jobId: string;

  @Column({ enum: JobStatus, default: JobStatus.PENDING })
  status: JobStatus;

  @Column({ nullable: true })
  error?: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToOne(() => FileEntity, (file) => file.jobLog)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;
}
