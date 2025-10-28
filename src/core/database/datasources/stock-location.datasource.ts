import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/stock-location/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/stock-location/*{.ts,.js}'],
};

const StockLocationDataSource = new DataSource(dataSourceOptions);

export default StockLocationDataSource;
