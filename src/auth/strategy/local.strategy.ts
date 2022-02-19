import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ username: 'accountAddress', password: 'nonce' });
  }

  /**
   * 
   * @param accountAddress 
   * @param nonce Save session
   * @returns 
   */
  async validate(accountAddress: string, nonce: string): Promise<any> {
    const user = await this.authService.validateAccount(accountAddress, nonce);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
