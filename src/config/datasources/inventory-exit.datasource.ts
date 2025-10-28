import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../modules/inventory-exit/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/batch/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/company/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../database/migrations/inventory-exit/*{.ts,.js}'],
};

const InventoryExitDataSource = new DataSource(dataSourceOptions);

export default InventoryExitDataSource;
