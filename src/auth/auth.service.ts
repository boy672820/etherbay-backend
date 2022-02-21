import { Injectable } from '@nestjs/common';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { LocalSign } from './type/sign.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateSign(
    { accountAddress, signature }: LocalSign,
    message: string,
  ) {
    const data = bufferToHex(Buffer.from(message, 'utf8'));
    const signedAddress = recoverPersonalSignature({ data, signature });

    return signedAddress.toUpperCase() === accountAddress.toUpperCase();
  }

  async createJwt(sub: string) {
    const jwt = this.jwtService.sign({ sub });

    return jwt;
  }
}
