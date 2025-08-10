import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from '../entities/company.entity';
import { Repository } from 'typeorm';
import { ResponseCompanyDto } from '../DTOs/response.company.dto';
import { toResponseCompanyDto } from '../mappers/company.mapper';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectRepository(Company)
    private readonly repo: Repository<Company>,
  ) {}

  findById(id: number): Promise<Company | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByCnpj(cnpj: string): Promise<Company | null> {
    return this.repo.findOne({ where: { cnpj } });
  }

  async findAll(): Promise<ResponseCompanyDto[]> {
    const result = await this.repo.find({
      relations: ['companyTypeRels', 'user'],
    });

    return result.map(toResponseCompanyDto);
  }

  create(company: Partial<Company>): Company {
    return this.repo.create(company);
  }

  save(company: Partial<Company>): Promise<Company> {
    return this.repo.save(company);
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}
