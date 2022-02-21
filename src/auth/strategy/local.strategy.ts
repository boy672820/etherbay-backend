import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { NONCE_MESSAGE } from '../constants';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      username: 'accountAddress',
      password: 'signature',
    });
  }

  async validate(accountAddress: string, signature: string): Promise<any> {
    const localSign = { accountAddress, signature };
    const signed = await this.authService.validateSign(
      localSign,
      NONCE_MESSAGE,
    );

    if (!signed) {
      throw new UnauthorizedException('인증되지 않은 서명입니다.');
    }
    return accountAddress;
  }
}
