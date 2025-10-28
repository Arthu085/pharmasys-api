import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/stock-balance/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/batch/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/company/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/stock-location/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/stock-balance/*{.ts,.js}'],
};

const StockBalanceDataSource = new DataSource(dataSourceOptions);

export default StockBalanceDataSource;
