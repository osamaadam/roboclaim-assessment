import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule {}
