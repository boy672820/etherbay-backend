import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Session,
  UseGuards,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { AuthService } from './auth.service';
import { AccountAddressDto } from './dto/account-address.dto';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  async signIn() {}

  @Post('nonce')
  async nonce(
    @Session() session,
    @Body() { accountAddress }: AccountAddressDto,
  ) {
    if (!accountAddress || !ethers.utils.isAddress(accountAddress)) {
      throw new BadRequestException('잘못된 계정주소 입니다.');
    }

    session[accountAddress] = await this.authService.generateNonce();

    const message = `etherBay에 오신것을 환영합니다. 서비스를 이용하기 위해 사용자 서명이 필요합니다. 넌스코드: ${session[accountAddress]}`;

    return message;
  }
}
