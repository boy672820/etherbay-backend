import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PinataModule } from './pinata/pinata.module';
import { AuthModule } from './auth/auth.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProductModule } from './product/product.module';
import { EthereumModule } from './ethereum/ethereum.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '',
    }),
    EventEmitterModule.forRoot(),
    PinataModule,
    AuthModule,
    ProductModule,
    EthereumModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
