import { Provider } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../guards/roles.guard';

export const RolesProvider: Provider = {
  provide: APP_GUARD,
  useClass: RolesGuard,
};
