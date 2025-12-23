import { Inject, Injectable } from '@nestjs/common';
import { ICompanyTypeRepository } from '../../domain/repositories/company-type.repository.interface';
import { CompanyTypeEntity } from '../../domain/entities/company-type.entity';
import { CompanyDomainService } from '../../domain/services/company-domain.service';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';

@Injectable()
export class FindOneCompanyTypeUseCase {
  constructor(
    @Inject(ICompanyTypeRepository)
    private readonly companyTypeRepository: ICompanyTypeRepository,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async findByNames(names: CompanyTypeEnum[]): Promise<CompanyTypeEntity[]> {
    const companyTypes = await this.companyTypeRepository.findByNames(names);

    return this.companyDomainService.validateCompanyType(companyTypes);
  }
}
