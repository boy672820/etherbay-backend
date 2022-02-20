import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      username: 'accountAddress',
      password: 'signature',
      passReqToCallback: true,
    });
  }

  async validate(
    request: Request,
    accountAddress: string,
    signature: string,
  ): Promise<any> {
    const message = request?.session[accountAddress];
    if (!message) {
      throw new UnauthorizedException('서명 요청이 없습니다.');
    }

    const localSign = { accountAddress, signature };
    const signed = await this.authService.validateSign(localSign, message);

    if (!signed) {
      throw new UnauthorizedException('인증되지 않은 서명입니다.');
    }
    return signed;
  }
}
