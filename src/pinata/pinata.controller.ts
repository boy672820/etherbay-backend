import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  Post,
} from '@nestjs/common';
import { CreateJsonToIpfsDto } from './dto/create.json-to-ipfs.dto';
import { PinataService } from './pinata.service';
import * as FormData from 'form-data';

@Controller('pinata')
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

  @Post('json')
  async jsonToIpfs(@Body() data: CreateJsonToIpfsDto, accountAddress: string) {
    try {
      const response = await this.pinataService.jsonToIpfs(
        accountAddress,
        data,
      );

      return response.data;
    } catch (e) {
      throw new ForbiddenException('IPFS 업로드 중 문제가 발생했습니다.');
    }
  }

  @Post('file')
  async fileToIpfs(@Body() formData: FormData) {
    try {
      const response = await this.pinataService.fileToIpfs(formData);

      return response.data;
    } catch (e) {
      throw new ForbiddenException('IPFS 업로드 중 문제가 발생했습니다.');
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
