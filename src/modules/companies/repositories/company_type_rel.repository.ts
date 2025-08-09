import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CompanyTypeRel } from '../entities/company_type_rel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyTypeRelRepository {
  constructor(
    @InjectRepository(CompanyTypeRel)
    private readonly repo: Repository<CompanyTypeRel>,
  ) {}

  create(data: CompanyTypeRel): CompanyTypeRel {
    return this.repo.create(data);
  }

  save(data: CompanyTypeRel): Promise<CompanyTypeRel> {
    return this.repo.save(data);
  }
}
