import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { StatusEnum } from 'src/shared/enums/status.enum';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyFilterDto } from '../../application/dtos/company-filter.dto';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';

@Injectable()
export class CompanyRepository implements ICompanyRepository {
  constructor(
    @InjectRepository(CompanyEntity)
    private readonly repo: Repository<CompanyEntity>,
  ) {}

  findAll(
    filters: CompanyFilterDto,
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

    return this.repo.findAndCount({
      where,
      relations: ['companyTypes', 'userCreated', 'userUpdated'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<CompanyEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['companyTypes', 'userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByCnpj(cnpj: string): Promise<CompanyEntity | null> {
    return this.repo.findOne({
      where: { cnpj },
      withDeleted: false,
    });
  }

  create(company: Partial<CompanyEntity>): Promise<CompanyEntity> {
    const newCompany = this.repo.create(company);
    return this.repo.save(newCompany);
  }

  update(uuid: UUID, data: Partial<CompanyEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  updateRelations(data: Partial<CompanyEntity>): Promise<CompanyEntity> {
    return this.repo.save(data as CompanyEntity);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
