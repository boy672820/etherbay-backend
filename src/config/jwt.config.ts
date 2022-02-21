import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  expires: process.env.JWT_EXPIRATION_TIME,
}));
