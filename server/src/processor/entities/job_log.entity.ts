import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobStatus } from '../constants/job_status.constant';
import { FileEntity } from './file.entity';

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

  @ManyToOne(() => UserEntity, (user) => user.jobLogs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @OneToOne(() => FileEntity, (file) => file.jobLog)
  @JoinColumn({ name: 'file_id' })
  file: FileEntity;
}
