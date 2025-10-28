import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

/**
 * DataSource para o contexto de Inventory Entry
 * Entidades: InventoryEntry, InventoryEntryItem, EntryItemType
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../modules/inventory-entry/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/company/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/stock-location/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/batch/**/*.entity{.ts,.js}',
  ],
  migrations: [
    __dirname + '/../database/migrations/inventory-entry/*{.ts,.js}',
  ],
};

const InventoryEntryDataSource = new DataSource(dataSourceOptions);

export default InventoryEntryDataSource;
