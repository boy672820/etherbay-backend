import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateAccount(accountAddress: string, nonce: string) {}
}
