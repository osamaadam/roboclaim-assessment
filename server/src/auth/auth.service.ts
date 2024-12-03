import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor() {}

  async validateUser(username: string, password: string): Promise<any> {
    return {
      username: 'test',
    };
  }
}
