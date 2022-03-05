import { ConfigService } from '@nestjs/config';
import { EthereumService } from '../ethereum/ethereum.service';
import abi from '../abi/EtherbayProduct.abi.json';

export const productProviders = [
  {
    provide: 'ETHERBAY_PRODUCT_CONTRACT',
    useFactory: async (
      configService: ConfigService,
      ethereumService: EthereumService,
    ) => {
      const contractAddress = configService.get<string>(
        'ethereum.etherbayProductAddress',
      );

      const ethersContract = { contractAddress, abi };
      const contract = ethereumService.contract(ethersContract);

      return contract;
    },
    inject: [ConfigService, EthereumService],
  },
];
