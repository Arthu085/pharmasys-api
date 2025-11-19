import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CompanyTypeEntity } from '../../domain/entities/company-type.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ICompanyTypeRepository } from '../../domain/repositories/company-type.repository.interface';

@Injectable()
export class CompanyTypeRepository implements ICompanyTypeRepository {
  constructor(
    @InjectRepository(CompanyTypeEntity)
    private readonly repo: Repository<CompanyTypeEntity>,
  ) {}

  findByNames(names: string[]): Promise<CompanyTypeEntity[]> {
    return this.repo.find({ where: { name: In(names) } });
  }
}
