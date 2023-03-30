import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const PORT = app.get(ConfigService).get<number>('PORT');

  await app.listen(PORT, () => {
    Logger.log(`Listening at http://localhost:${PORT}`);
  });
}
bootstrap();
