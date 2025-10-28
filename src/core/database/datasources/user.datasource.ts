import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de User
 * Entidades: User, Role
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [__dirname + '/../../../modules/user/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/user/*{.ts,.js}'],
};

const UserDataSource = new DataSource(dataSourceOptions);

export default UserDataSource;
