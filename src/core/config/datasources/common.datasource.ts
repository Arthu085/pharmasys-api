import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

/**
 * DataSource para entidades comuns/compartilhadas
 * Nota: As entidades de tipo específico agora estão em seus respectivos módulos
 * (EntryItemType, ExitItemType, TransferReason)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [__dirname + '/../../common/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../database/migrations/common/*{.ts,.js}'],
};

const CommonDataSource = new DataSource(dataSourceOptions);

export default CommonDataSource;
