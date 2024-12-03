import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [TypeOrmModule.forFeature([UserSchema])],
  exports: [TypeOrmModule, UserService],
  providers: [UserService],
})
export class UserModule {}
