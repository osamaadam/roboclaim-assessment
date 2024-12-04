import { UserEntity } from 'src/user/entities/user.entity';

export type QueuePayload = {
  user: Omit<UserEntity, 'password'>;
  files: Express.Multer.File[];
};
