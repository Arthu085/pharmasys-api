import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyType } from '../entities/company_type.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyTypeRepository {
  constructor(
    @InjectRepository(CompanyType)
    private readonly repo: Repository<CompanyType>,
  ) {}

  findByName(name: string): Promise<CompanyType | null> {
    return this.repo.findOne({ where: { name } });
  }
}
