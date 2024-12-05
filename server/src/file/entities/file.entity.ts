import { Exclude } from 'class-transformer';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { JobLogEntity } from '../../processor/entities/job_log.entity';

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

  @Column({ name: 'content', nullable: true })
  content: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToOne(() => JobLogEntity, (jobLog) => jobLog.file)
  jobLog: JobLogEntity;

  @ManyToOne(() => UserEntity, (user) => user.files)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
