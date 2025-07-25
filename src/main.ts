import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins =
    process.env.NODE_ENV === 'production'
      ? ['https://pharmasys-to4a.onrender.com'] // REMOTO
      : ['http://localhost:5173']; // LOCAL

  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
