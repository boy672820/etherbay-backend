import { BadRequestException, Controller, Get, Param } from '@nestjs/common';
import { PinataService } from './pinata.service';

@Controller('pinata')
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Get('ipfs/:ipfsHash')
  async getIpfs(@Param() { ipfsHash }: { ipfsHash: string }) {
    try {
      const data = await this.pinataService.getIpfs(ipfsHash);

      return data;
    } catch (e) {
      throw new BadRequestException('잘못된 요청입니다.');
    }
  }
}
