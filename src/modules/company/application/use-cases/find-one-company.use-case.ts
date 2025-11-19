import { Inject, Injectable } from '@nestjs/common';
import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyResponseDto } from '../dtos/company-response.dto';
import { plainToInstance } from 'class-transformer';
import { CompanyDomainService } from '../../domain/services/company-domain.service';
import { CompanyEntity } from '../../domain/entities/company.entity';

@Injectable()
export class FindOneCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async execute(uuid: string): Promise<CompanyResponseDto> {
    const company = await this.companyRepository.findOne(uuid);
    const validatedCompany = this.companyDomainService.validateCompany(company);

    return plainToInstance(CompanyResponseDto, validatedCompany, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
    validateActive = true,
  ): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOne(uuid);

    if (validateActive) {
      return this.companyDomainService.validateCompanyAndEnsureActive(company);
    }

    return this.companyDomainService.validateCompany(company);
  }

  async findByCnpj(cnpj: string) {
    return this.companyRepository.findByCnpj(cnpj);
  }
}
