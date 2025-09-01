import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CompanyType } from '../entities/company-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
