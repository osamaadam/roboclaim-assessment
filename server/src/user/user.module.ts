import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesEntity } from './entities/roles.entity';
import { UsersEntity } from './entities/user.entity';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UsersEntity, RolesEntity])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule {}
