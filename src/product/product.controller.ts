import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create.product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  @UseInterceptors(FileInterceptor('image'))
  @Post()
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() data: CreateProductDto,
  ) {}
}
