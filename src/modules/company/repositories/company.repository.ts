import { Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { CompanyEntity } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FilterCompanyDto } from '../DTOs/filter.company.dto';
import { CompanyTypeEnum } from '../enums/company-type.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repo: Repository<CompanyEntity>,
  ) {}

  findAll(
    filters: FilterCompanyDto,
    take: number,
    skip: number,
  ): Promise<[CompanyEntity[], number]> {
    const where: FindOptionsWhere<CompanyEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.cnpj) {
      where.cnpj = ILike(`%${filters.cnpj}%`);
    }

    if (filters.companyType) {
      const companyName = CompanyTypeEnum[filters.companyType];
      where.companyTypes = {
        name: companyName,
      };
    }

    if (filters.status) {
      const status = StatusEnum[filters.status];
      where.status = status;
    }

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<CompanyEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByCnpj(cnpj: string): Promise<CompanyEntity | null> {
    return this.repo.findOne({ where: { cnpj } });
  }

  create(company: Partial<CompanyEntity>): CompanyEntity {
    return this.repo.create(company);
  }

  merge(
    company: CompanyEntity,
    dto: DeepPartial<CompanyEntity>,
  ): CompanyEntity {
    return this.repo.merge(company, dto);
  }

  save(company: CompanyEntity): Promise<CompanyEntity> {
    return this.repo.save(company);
  }
}
