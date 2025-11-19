import { UpdateResult } from 'typeorm';
import { CompanyFilterDto } from '../../application/dtos/company-filter.dto';
import { CompanyEntity } from '../entities/company.entity';

export const ICompanyRepository = Symbol('ICompanyRepository');

export interface ICompanyRepository {
  findAll(
    filters: CompanyFilterDto,
    take: number,
    skip: number,
  ): Promise<[CompanyEntity[], number]>;

  findOne(uuid: string): Promise<CompanyEntity | null>;

  findByCnpj(cnpj: string): Promise<CompanyEntity | null>;

  create(company: Partial<CompanyEntity>): Promise<CompanyEntity>;

  update(company: CompanyEntity): Promise<UpdateResult>;

  updateRelations(company: CompanyEntity): Promise<CompanyEntity>;

  softDelete(uuid: string): Promise<UpdateResult>;
}
