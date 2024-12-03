import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/user_login.dto';
import { Public } from './guards/public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  async register(@Body() userDto: CreateUserDto) {
    return this.authService.createUser(userDto);
  }

  @Public()
  @Post('login')
  async login(@Body() userDto: UserLoginDto) {
    return this.authService.login(userDto);
  }
}
