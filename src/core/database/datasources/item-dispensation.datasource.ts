import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de Item Dispensation
 * Entidades: ItemDispensation
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/item-dispensation/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/patient/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/prescriptor/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/item/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/batch/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/company/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/item-dispensation/*{.ts,.js}'],
};

const ItemDispensationDataSource = new DataSource(dataSourceOptions);

export default ItemDispensationDataSource;
