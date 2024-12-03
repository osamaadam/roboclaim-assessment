import { UserSchema } from './user/schema/user.schema';

declare module 'express' {
  interface Request {
    user?: UserSchema;
  }
}
