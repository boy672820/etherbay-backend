import { Controller, ForbiddenException, Get } from '@nestjs/common';
import { PinataService } from './pinata.service';

@Controller('pinata')
export class PinataController {
  constructor(private readonly pinataService: PinataService) {}

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
