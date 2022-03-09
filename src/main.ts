import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({ origin: 'http://10.178.0.2:3000', credentials: true });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
