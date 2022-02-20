import { NestFactory } from '@nestjs/core';
import * as session from 'express-session';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: 'etherbay-secret',
      cookie: { maxAge: 60000 },
      rolling: true,
      resave: true,
      saveUninitialized: false,
      store: new session.MemoryStore(),
    }),
  );

  app.enableCors({ origin: 'http://127.0.0.1:3000' });

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
