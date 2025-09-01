import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { Company } from '../entities/company.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  findAll(): Promise<Company[]> {
    return this.repo.find();
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
