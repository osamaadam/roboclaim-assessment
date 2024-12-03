import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';
import { UserLoginDto } from './dto/user_login.dto';

@Injectable()
export class AuthService {
  saltRounds = 10;
  constructor(
    private readonly userService: UserService,
    private readonly logger: Logger,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userDto: UserLoginDto) {
    try {
      const user = await this.userService.findUser(userDto.username);

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const isPasswordValid = this.comparePassword(
        userDto.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid password');
      }

      return user;
    } catch (err) {
      this.logger.error(err);
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async login(userDto: UserLoginDto) {
    const user = await this.validateUser(userDto);
    const token = this.jwtService.sign({ username: user.username });
    return {
      user,
      token,
    };
  }

  async createUser(userDto: CreateUserDto) {
    userDto.password = this.hashPassword(userDto.password);
    const user = await this.userService.createUser(userDto);

    return this.login(user);
  }

  hashPassword(password: string) {
    const hash = bcrypt.hashSync(password, this.saltRounds);
    return hash;
  }

  comparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
