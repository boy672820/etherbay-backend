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
import * as FormData from 'form-data';
import { Readable } from 'stream';

@Controller('product')
export class ProductController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {
    // convert buffer to stream
    const stream = Readable.from(image.buffer) as any;
    stream.path = image.originalname; // hack*

    const formData = new FormData();
    formData.append('file', stream);

    const hash = await this.eventEmitter.emitAsync(
      PINATA_EVENT.FILE_TO_IPFS,
      formData,
    );

    return hash;
  }
}
