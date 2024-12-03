import { Logger, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { RolesEntity } from './entities/roles.entity';

@Module({
  imports: [
    UserModule,
    PassportModule,
    TypeOrmModule.forFeature([RolesEntity]),
  ],
  controllers: [AuthController],
  providers: [AuthService, Logger],
  exports: [AuthService, PassportModule, TypeOrmModule],
})
export class AuthModule {}
