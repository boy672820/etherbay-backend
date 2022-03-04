import { BadRequestException, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import pinataConfig from '../config/pinata.config';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    ConfigModule.forFeature(pinataConfig),
    MulterModule.register({
      fileFilter: (_request, file, callback) => {
        // 이미지 형식은 jpg, jpeg, png만 허용
        if (file.mimetype.match(/\/(jpg|jpeg|png)$/)) {
          callback(null, true);
        } else {
          callback(
            new BadRequestException('이미지 형식만 업로드 할 수 있습니다.'),
            false,
          );
        }
      },
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
