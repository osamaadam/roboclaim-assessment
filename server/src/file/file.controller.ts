import { Controller, Get, Param, Query } from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { UserEntity } from 'src/user/entities/user.entity';
import { FileService } from './file.service';

@Controller('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get('')
  async getFiles(
    @User() user: UserEntity,
    @Query('page') page?: number,
    @Query('pageSize') pageSize?: number,
  ) {
    page ||= 0;
    pageSize ||= 10;
    const [files, count] = await this.fileService.getFiles(
      user,
      page,
      pageSize,
    );

    return {
      files: files.map((file) => ({
        ...file,
        content: file.content?.slice(0, 100),
      })),
      count,
    };
  }

  @Get('insights')
  async getInsights(@User() user: UserEntity) {
    return this.fileService.getInsights(user);
  }

  @Get(':id')
  async getFile(@User() user: UserEntity, @Param('id') id: number) {
    return this.fileService.getFile(user, id);
  }
}
