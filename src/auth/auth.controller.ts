import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ethers } from 'ethers';
import { AuthService } from './auth.service';
import { NONCE_MESSAGE } from './constants';
import { AccountAddressDto } from './dto/account-address.dto';
import { LocalGuard } from './guard/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalGuard)
  @Post()
  async signIn(@Req() request) {
    const accountAddress = request.user;
    const jwt = await this.authService.createJwt(accountAddress);

    return jwt;
  }

  // nonce 세션 저장 안됨
  // 한 요청에 대해서만 세션 저장
  @Post('nonce')
  async nonce(@Body() { accountAddress }: AccountAddressDto) {
    if (!accountAddress || !ethers.utils.isAddress(accountAddress)) {
      throw new BadRequestException('잘못된 계정주소 입니다.');
    }

    const message = NONCE_MESSAGE;

    return message;
  }
}
