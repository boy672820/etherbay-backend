import { registerAs } from '@nestjs/config';

export default registerAs('ethereum', () => ({
  rpcUrl: process.env.ETH_RPC_URL,
  ownerAddress: process.env.ETH_OWNER_ADDRESS,
  privateKey: process.env.ETH_OWNER_PRIVATE_KEY,
  etherbayProductAddress: process.env.ETH_ETHERBAY_PRODUCT_ADDRESS,
}));
