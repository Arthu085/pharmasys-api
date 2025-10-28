import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de Stock Transfer
 * Entidades: StockTransfer, StockTransferItem
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/stock-transfer/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/stock-location/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/batch/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/company/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/stock-transfer/*{.ts,.js}'],
};

const StockTransferDataSource = new DataSource(dataSourceOptions);

export default StockTransferDataSource;
