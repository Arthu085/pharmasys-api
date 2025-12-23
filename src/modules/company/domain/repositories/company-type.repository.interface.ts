import { CompanyTypeEntity } from '../entities/company-type.entity';
import { CompanyTypeEnum } from '../enums/company-type.enum';

export const ICompanyTypeRepository = Symbol('ICompanyTypeRepository');

export interface ICompanyTypeRepository {
  findByNames(names: CompanyTypeEnum[]): Promise<CompanyTypeEntity[] | null>;
}
