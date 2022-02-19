import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinataModule } from './pinata/pinata.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '',
    }),
    PinataModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
