import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterCompanyDto } from '../DTOs/filter.company.dto';
import { FilterDto } from 'src/shared/DTOs/filter.dto';
import { CompanyTypeEnum } from '../enums/company-type.enum';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  findAll(
    filters: FilterCompanyDto,
    take: number,
    skip: number,
  ): Promise<[Company[], number]> {
    const where: FindOptionsWhere<Company> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.cnpj) {
      where.cnpj = ILike(`%${filters.cnpj}%`);
    }

    if (filters.status) {
      where.companyStatus = filters.status;
    }

    if (filters.companyType) {
      const companyName = CompanyTypeEnum[filters.companyType];

      where.companyTypes = {
        name: companyName,
      };
    }

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<Company | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByCnpj(cnpj: string): Promise<Company | null> {
    return this.repo.findOne({ where: { cnpj } });
  }

  create(company: Partial<Company>): Company {
    return this.repo.create(company);
  }

  merge(company: Company, dto: DeepPartial<Company>): Company {
    return this.repo.merge(company, dto);
  }

  save(company: Company): Promise<Company> {
    return this.repo.save(company);
  }
}
