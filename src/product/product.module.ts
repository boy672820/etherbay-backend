import { BadRequestException, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
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
