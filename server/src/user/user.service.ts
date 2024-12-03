import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUser(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async createUser(userDto: CreateUserDto) {
    return this.userRepository.insert(userDto);
  }
}
