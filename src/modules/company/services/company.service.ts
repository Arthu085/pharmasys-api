import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CompanyRepository } from '../repositories/company.repository';
import { CompanyTypeRepository } from '../repositories/company-type.repository';
import { ResponseCompanyDto } from '../DTOs/response.company.dto';
import { toResponseCompanyDto } from '../mappers/company.mapper';

@Injectable()
export class CompanyService {
  private readonly logger = new Logger(CompanyService.name);

  constructor(
    private readonly companyRepository: CompanyRepository,
    private readonly companyTypeRepository: CompanyTypeRepository,
  ) {}

  async findAllCompanies(): Promise<ResponseCompanyDto[]> {
    const companies = await this.companyRepository.findAll();

    return companies.map((company) => toResponseCompanyDto(company));
  }

  async findByIdCompany(id: number): Promise<ResponseCompanyDto | null> {
    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new NotFoundException('Empresa não encontrada');
    }

    return toResponseCompanyDto(company);
  }
}
