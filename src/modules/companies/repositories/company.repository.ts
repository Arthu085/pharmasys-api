import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  create(company: Partial<Company>): Company {
    return this.repo.create(company);
  }

  save(company: Partial<Company>): Promise<Company> {
    return this.repo.save(company);
  }

  findByCnpj(cnpj: string): Promise<Company | null> {
    return this.repo.findOne({ where: { cnpj } });
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }

  findById(id: number): Promise<Company | null> {
    return this.repo.findOne({ where: { id } });
  }
}
