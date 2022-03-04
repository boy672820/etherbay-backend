import { registerAs } from '@nestjs/config';

export default registerAs('pinata', () => ({
  ipfsUrl: process.env.PINATA_IPFS_URL,
  apiUrl: process.env.PINATA_API_URL,
  key: process.env.PINATA_KEY,
  secret: process.env.PINATA_SECRET,
  jwt: process.env.PINATA_JWT,
}));
