import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CompanyTypeEntity } from '../entities/company-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyTypeRepository {
  constructor(
    @InjectRepository(CompanyTypeEntity)
    private readonly repo: Repository<CompanyTypeEntity>,
  ) {}

  findByNames(names: string[]): Promise<CompanyTypeEntity[]> {
    return this.repo.find({ where: { name: In(names) } });
  }
}
