import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { CompanyType } from '../entities/company-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyTypeRepository {
  constructor(
    @InjectRepository(CompanyType)
    private readonly repo: Repository<CompanyType>,
  ) {}

  findByNames(names: string[]): Promise<CompanyType[]> {
    return this.repo.find({ where: { name: In(names) } });
  }
}
