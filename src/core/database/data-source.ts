import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../config/typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../**/*.entity{.ts,.js}',
    __dirname + '/../../modules/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const AppDataSource = new DataSource(dataSourceOptions);

export default AppDataSource;
