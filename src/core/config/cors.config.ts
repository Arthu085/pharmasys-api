import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { env } from './env.config';

export const corsConfig: CorsOptions = {
  origin:
    env.nodeEnv === 'production'
      ? ['https://pharmasys-to4a.onrender.com'] // REMOTO
      : ['http://localhost:5173'], // LOCAL
  credentials: true,
};
