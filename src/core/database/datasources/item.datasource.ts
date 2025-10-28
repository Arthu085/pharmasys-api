import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de Item
 * Entidades: Item, Type, Subtype, Presentation, Dosage
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/item/*{.ts,.js}'],
};

const ItemDataSource = new DataSource(dataSourceOptions);

export default ItemDataSource;
