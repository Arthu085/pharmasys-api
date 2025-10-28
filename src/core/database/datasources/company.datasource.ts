import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../../config/typeorm.config';

/**
 * DataSource para o contexto de Company
 * Entidades: Company, CompanyType
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../../modules/company/**/*.entity{.ts,.js}',
    __dirname + '/../../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../migrations/company/*{.ts,.js}'],
};

const CompanyDataSource = new DataSource(dataSourceOptions);

export default CompanyDataSource;
