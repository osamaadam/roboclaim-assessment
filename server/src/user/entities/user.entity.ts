import { Exclude } from 'class-transformer';
import { JobLogEntity } from 'src/processor/entities/job_log.entity';
import { RolesEntity } from 'src/user/entities/roles.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class UserEntity {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => RolesEntity, { eager: true })
  @JoinTable()
  roles: RolesEntity[];

  @OneToMany(() => JobLogEntity, (jobLog) => jobLog.user)
  jobLogs: JobLogEntity[];
}
