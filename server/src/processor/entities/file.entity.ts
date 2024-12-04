import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobLogEntity } from './job_log.entity';

@Entity('files')
export class FileEntity {
  constructor(data: Partial<FileEntity>) {
    Object.assign(this, data);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ unique: true, name: 'name_on_disk' })
  nameOnDisk: string;

  @Column({ name: 'original_name' })
  originalName: string;

  @Column()
  mimetype: string;

  @Column()
  size: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => JobLogEntity, (jobLog) => jobLog.file)
  jobLog: JobLogEntity;
}
