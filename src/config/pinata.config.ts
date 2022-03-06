import { registerAs } from '@nestjs/config';

export default registerAs('pinata', () => ({
  apiUrl: process.env.PINATA_API_URL,
  gatewayUrl: process.env.PINATA_GATEWAY_URL,
  key: process.env.PINATA_KEY,
  secret: process.env.PINATA_SECRET,
  jwt: process.env.PINATA_JWT,
}));
