import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('/ping')
  async ping() {
    return 'pong';
  }
}
