import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
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
