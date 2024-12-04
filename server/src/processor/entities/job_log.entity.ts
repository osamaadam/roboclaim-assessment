import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { JobStatus } from '../constants/job_status.constant';

@Entity('job_log')
export class JobLogEntity {
  constructor(data: Partial<JobLogEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  jobId: string;

  @Column({ enum: JobStatus, default: JobStatus.PENDING })
  status: JobStatus;

  @Column()
  fileName: string;

  @Column()
  mimetype: string;

  @Column({ nullable: true })
  error?: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.jobLogs)
  user: UserEntity;
}
