import { UsersEntity } from './user/entities/user.entity';

declare module 'express' {
  interface Request {
    user?: UsersEntity;
  }
}
