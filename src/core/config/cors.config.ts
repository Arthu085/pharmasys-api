import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { env } from './env.config';

export const corsConfig: CorsOptions = {
  origin: env.frontendUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Accept'],
};
