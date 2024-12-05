import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FileService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}
  async createFile(file: FileEntity) {
    return this.fileRepository.save(file);
  }

  async addContentToExistingFile(nameOnDisk: string, content: string) {
    return this.fileRepository.update({ nameOnDisk }, { content });
  }

  async getFiles(
    user: UserEntity,
    page: number,
    pageSize: number = 10,
  ): Promise<FileEntity[]> {
    return this.fileRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
      take: pageSize,
      skip: page * pageSize,
    });
  }

  async getFile(user: UserEntity, id: number) {
    return this.fileRepository.findOne({
      where: {
        id,
        user: {
          id: user.id,
        },
      },
    });
  }

  async getInsights(user: UserEntity) {
    return this.fileRepository
      .createQueryBuilder('f')
      .select([
        'mimetype',
        'COUNT(*) as count',
        "SUM(CASE WHEN jl.status = 'FAILED' THEN 1 ELSE 0 END) as failed",
      ])
      .innerJoin('f.jobLog', 'jl')
      .where('f.user_id = :userId', { userId: user.id })
      .groupBy('mimetype')
      .execute();
  }
}
