import { Module } from '@nestjs/common';
import { PinataService } from './pinata.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import pinataConfig from 'src/config/pinata.config';
import { HttpModule } from '@nestjs/axios';
import { PinataListener } from './pinata.listener';
import { PinataController } from './pinata.controller';
import ipfsConfig from '../config/ipfs.config';

@Module({
  imports: [
    ConfigModule.forFeature(pinataConfig),
    ConfigModule.forFeature(ipfsConfig),
    HttpModule.registerAsync({
      imports: [ConfigModule.forFeature(pinataConfig)],
      useFactory: async (configService: ConfigService) => {
        const baseURL = configService.get<string>('pinata.apiUrl');
        const key = configService.get<string>('pinata.key');
        const secret = configService.get<string>('pinata.secret');
        const jwt = configService.get<string>('pinata.jwt');

        return {
          baseURL,
          headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
            Authorization: `Bearer ${jwt}`,
          },
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [PinataService, PinataListener],
  controllers: [PinataController],
})
export class PinataModule {}
