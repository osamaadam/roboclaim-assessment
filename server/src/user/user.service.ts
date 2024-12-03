import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/enums/role.enum';
import { RolesEntity } from 'src/user/entities/roles.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create_user.dto';
import { UsersEntity } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>,
  ) {}

  async findUser(username: string) {
    return this.userRepository.findOneBy({
      username,
    });
  }

  async createUser(userDto: CreateUserDto) {
    const userRole = await this.rolesRepository.findOneBy({
      role: Role.USER,
    });

    if (!userRole) {
      throw new Error('User role not found');
    }

    const user = new UsersEntity({
      ...userDto,
      roles: [userRole],
    });

    return this.userRepository.save(user);
  }

  async seedRoles() {
    const roles = (await this.rolesRepository.find()).map(
      (roleEntity) => roleEntity.role,
    );
    const rolesToInsert: Partial<RolesEntity>[] = [];
    for (const role of Object.values(Role)) {
      if (!roles.includes(role)) {
        rolesToInsert.push({ role });
      }
    }

    return this.rolesRepository.insert(rolesToInsert);
  }
}
