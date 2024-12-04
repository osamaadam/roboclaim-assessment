import { UserEntity } from './user/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: UserEntity;
  }
}
