import {
  Body,
  ConflictException,
  Controller,
  Get,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';
import { UserLoginDto } from './dto/user_login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    try {
      return await this.authService.createUser(userDto);
    } catch {
      throw new ConflictException('Username already exists');
    }
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }

  @Get('profile')
  async profile(@Req() req: Request) {
    return req.user;
  }
}
