import { DataSource, DataSourceOptions } from 'typeorm';
import { typeOrmConfig } from '../typeorm.config';

/**
 * DataSource para o contexto de Prescriptor
 * Entidades: Prescriptor, Advice
 */
const dataSourceOptions: DataSourceOptions = {
  ...(typeOrmConfig as DataSourceOptions),
  entities: [
    __dirname + '/../../modules/prescriptor/**/*.entity{.ts,.js}',
    __dirname + '/../../modules/user/**/*.entity{.ts,.js}',
  ],
  migrations: [__dirname + '/../database/migrations/prescriptor/*{.ts,.js}'],
};

const PrescriptorDataSource = new DataSource(dataSourceOptions);

export default PrescriptorDataSource;
