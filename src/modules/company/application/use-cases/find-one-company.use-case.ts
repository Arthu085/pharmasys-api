import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { plainToInstance } from 'class-transformer';
import { CompanyDomainService } from '../../domain/services/company-domain.service';
import { CompanyEntity } from '../../domain/entities/company.entity';
import { CompanyResponseOneDto } from '../dtos/company-response-one.dto';

@Injectable()
export class FindOneCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async execute(uuid: UUID): Promise<CompanyResponseOneDto> {
    const company = await this.companyRepository.findOne(uuid);
    this.companyDomainService.validateCompanyAndEnsureActive(company);

    return plainToInstance(CompanyResponseOneDto, company, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
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
