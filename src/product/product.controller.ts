import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { PINATA_EVENT } from '../common/events/pinata.event';
import { CreateProductDto } from './dto/create.product.dto';
import { Readable } from 'stream';
import * as FormData from 'form-data';

@Controller('product')
export class ProductController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {
    const fileStream = Readable.from(image.buffer);

    const formData = new FormData();
    formData.append('file', fileStream);

    const hash = await this.eventEmitter.emitAsync(
      PINATA_EVENT.FILE_TO_IPFS,
      formData,
    );

    return hash;
  }
}
