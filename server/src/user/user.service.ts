import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UserSchema } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
  ) {}

  async findUser(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async createUser(userDto: CreateUserDto) {
    const user = this.userRepository.create(userDto);

    return this.userRepository.save(user);
  }
}
