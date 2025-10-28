import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

/**
 * DataSource para o contexto de Patient
 * Entidades: Patient
 * Dependências: User (para userCreated/userUpdated)
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../modules/patient/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../database/migrations/patient/*{.ts,.js}'],
};

const PatientDataSource = new DataSource(dataSourceOptions);

export default PatientDataSource;
