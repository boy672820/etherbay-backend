import { Injectable } from '@nestjs/common';
import { recoverPersonalSignature } from '@metamask/eth-sig-util';
import { bufferToHex } from 'ethereumjs-util';
import { nanoid } from 'nanoid';
import { LocalSign } from './type/sign.type';

@Injectable()
export class AuthService {
  async generateNonce() {
    const id = nanoid(6);

    return id;
  }

  async validateSign(
    { accountAddress, signature }: LocalSign,
    message: string,
  ) {
    const hex = bufferToHex(Buffer.from(message, 'utf8'));
    const signedAddress = recoverPersonalSignature({
      data: hex,
      signature: signature,
    });

    return signedAddress === accountAddress;
  }
}
