import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { CompanyTypeEntity } from '../entities/company-type.entity';
import { CompanyTypeNotFoundException } from '../exceptions/company-type-not-found.exception';
import { CompanyEntity } from '../entities/company.entity';
import { CompanyNotFoundException } from '../exceptions/company-not-found.exception';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { CompanyAlreadyExistsException } from '../exceptions/company-already-exists.exception';
import { CompanyTypeEnum } from '../enums/company-type.enum';

@Injectable()
export class CompanyDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateCompany(company: CompanyEntity | null): CompanyEntity {
    if (!company) {
      throw new CompanyNotFoundException();
    }

    return company;
  }

  validateCompanyAndEnsureActive(company: CompanyEntity | null): CompanyEntity {
    const validated = this.validateCompany(company);
    validated.ensureIsActive();

    return validated;
  }

  validateCompanySameStatus(company: CompanyEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(company, status);
  }

  validateCompanyType(
    companyType: CompanyTypeEntity[] | null,
  ): CompanyTypeEntity[] {
    if (!companyType || companyType.length === 0) {
      throw new CompanyTypeNotFoundException();
    }

    return companyType;
  }

  validateCompanyExistsCreate(company: CompanyEntity | null): void {
    if (company) {
      throw new CompanyAlreadyExistsException();
    }
  }

  validateCompanyExistsUpdate(
    updateCompany: CompanyEntity | null,
    existingCompany: CompanyEntity | null,
  ): void {
    if (
      updateCompany &&
      existingCompany &&
      updateCompany.id !== existingCompany.id
    ) {
      throw new CompanyAlreadyExistsException();
    }
  }
}
