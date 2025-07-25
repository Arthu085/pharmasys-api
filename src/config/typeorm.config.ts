import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { env } from './env.config';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: env.db.host,
  port: env.db.port,
  username: env.db.username,
  password: env.db.password,
  database: env.db.name,
  schema: 'pharmasys',
  ssl: env.db.ssl ? { rejectUnauthorized: false } : false,
  autoLoadEntities: true,
  synchronize: false,
};
