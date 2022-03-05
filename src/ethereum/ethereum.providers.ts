import { ConfigService } from '@nestjs/config';
import { ethers } from 'ethers';

export const ethereumProviders = [
  {
    provide: 'SIGNER',
    inject: [ConfigService],
    useFactory: async (configService: ConfigService) => {
      const rpc = configService.get<string>('ethereum.rpcUrl');
      const provider = new ethers.providers.JsonRpcProvider(rpc);

      await provider.ready;

      const privateKey = configService.get<string>('ethereum.privateKey');
      const signer = new ethers.Wallet(privateKey, provider);

      return signer;
    },
  },
];
