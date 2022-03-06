import { registerAs } from '@nestjs/config';

export default registerAs('ipfs', () => ({
  gatewayUrl: process.env.IPFS_GATEWAY_URL,
}));
