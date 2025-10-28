import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

/**
 * DataSource para entidades comuns/compartilhadas
 * Entidades: InventoryType, TransferReasonType
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [__dirname + '/../../common/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/common/*{.ts,.js}'],
};

const CommonDataSource = new DataSource(dataSourceOptions);

export default CommonDataSource;
