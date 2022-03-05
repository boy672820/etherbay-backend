import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import ethereumConfig from '../config/ethereum.config';
import { ethereumProviders } from './ethereum.providers';
import { EthereumService } from './ethereum.service';

@Module({
  imports: [ConfigModule.forFeature(ethereumConfig)],
  providers: [EthereumService, ...ethereumProviders],
  exports: [EthereumService],
})
export class EthereumModule {}
