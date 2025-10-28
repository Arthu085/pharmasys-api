import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../modules/stock-location/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../database/migrations/stock-location/*{.ts,.js}'],
};

const StockLocationDataSource = new DataSource(dataSourceOptions);

export default StockLocationDataSource;
