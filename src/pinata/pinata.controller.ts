import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { CreateJsonToIpfsDto } from './dto/create.json-to-ipfs.dto';
import { PinataService } from './pinata.service';

@Controller('pinata')
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Post()
  async jsonToIpfs(@Body() data: CreateJsonToIpfsDto, accountAddress: string) {
    try {
      const response = await this.pinataService.jsonToIpfs(
        accountAddress,
        data,
      );

      return response.data;
    } catch (e) {
      throw new ForbiddenException('Pinata authentication test failed');
    }
  }

  @Get('test')
  async test(): Promise<string> {
    try {
      const response = await this.pinataService.test();

      return response.data;
    } catch (e) {
      throw new ForbiddenException('Pinata authentication test failed');
    }
  }
}
