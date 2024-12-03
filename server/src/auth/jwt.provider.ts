import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JWTAuthGuard } from './guards/jwt-auth.guard';

export const JWTProvider: Provider = {
  provide: APP_GUARD,
  useClass: JWTAuthGuard,
};
