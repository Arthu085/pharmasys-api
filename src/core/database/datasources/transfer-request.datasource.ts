import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de Transfer Request
 * Entidades: TransferRequest, TransferRequestItem, TransferReason
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/transfer-request/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/stock-location/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/item/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/transfer-request/*{.ts,.js}'],
};

const TransferRequestDataSource = new DataSource(dataSourceOptions);

export default TransferRequestDataSource;
