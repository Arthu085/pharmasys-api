import { CompanyTypeEntity } from '../entities/company-type.entity';

export const ICompanyTypeRepository = Symbol('ICompanyTypeRepository');

export interface ICompanyTypeRepository {
  findByNames(names: string[]): Promise<CompanyTypeEntity[] | null>;
}
