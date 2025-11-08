import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { corsConfig } from './core/config/cors.config';
import { env } from './core/config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { TransformResponseInterceptor } from './core/interceptors/transform-response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(corsConfig);
  app.setGlobalPrefix('api');

  app.useGlobalInterceptors(new TransformResponseInterceptor(new Reflector()));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  await app.listen(env.port);
}
bootstrap();
