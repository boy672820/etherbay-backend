import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { PINATA_EVENT } from '../common/events/pinata.event';
import { CreateProductDto } from './dto/create.product.dto';
import { ConfigService } from '@nestjs/config';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { ProductService } from './product.service';
import FormData from 'form-data';
import { Readable } from 'stream';

@Controller('product')
export class ProductController {
  constructor(
    private readonly eventEmitter: EventEmitter2,
    private readonly configService: ConfigService,
    private readonly productService: ProductService,
  ) {}

  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() product: CreateProductDto,
    @User() payload,
  ) {
    const accountAddress = payload.sub;

    // convert buffer to stream
    const stream = Readable.from(image.buffer) as any;
    stream.path = image.originalname; // hack*

    const formData = new FormData();
    formData.append('file', stream);

    const fileHash = await this.eventEmitter.emitAsync(
      PINATA_EVENT.FILE_TO_IPFS,
      formData,
    );

    const apiUrl = this.configService.get<string>('pinata.ipfsUrl');
    const ipfsImage = `${apiUrl}/${fileHash}`;

    const data = {
      name: product.name,
      description: product.description,
      image: ipfsImage,
      attributes: [
        {
          trait_type: 'category',
          value: product.category,
        },
      ],
    };
    const jsonHash = await this.eventEmitter.emitAsync(
      PINATA_EVENT.JSON_TO_IPFS,
      accountAddress,
      data,
    );

    const ipfsJson = `${apiUrl}/${jsonHash[0]}`;
    const minted = await this.productService.mint(accountAddress, ipfsJson);

    return {
      ...data,
      ...minted,
      ipfs: jsonHash[0],
    };
  }
}
