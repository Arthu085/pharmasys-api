import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { CompanyUpdateDto } from '../dtos/company-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneCompanyUseCase } from './find-one-company.use-case';
import { CompanyCnpj } from '../../domain/values-objects/company-cnpj.vo';
import { CompanyName } from '../../domain/values-objects/company-name.vo';
import { FindOneCompanyTypeUseCase } from './find-one-company-type.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { CompanyDomainService } from '../../domain/services/company-domain.service';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class UpdateCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly findOneCompanyTypeUseCase: FindOneCompanyTypeUseCase,
    private readonly companyDomainService: CompanyDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: CompanyUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      name: dto.name ? CompanyName.create(dto.name) : undefined,
      cnpj: dto.cnpj ? CompanyCnpj.create(dto.cnpj) : undefined,
      companyTypes: dto.companyTypes
        ? await this.findOneCompanyTypeUseCase.findByNames(dto.companyTypes)
        : undefined,
    };

    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const company = await this.findOneCompanyUseCase.findEntityByUuid(uuid);

    this.companyDomainService.validateCompanyAndEnsureActive(company);

    if (binds.name) {
      company.changeName(binds.name);
    }

    if (binds.cnpj) {
      const currentCnpj = CompanyCnpj.create(company.cnpj);

      if (!binds.cnpj.equals(currentCnpj)) {
        const existingCompany = await this.findOneCompanyUseCase.findByCnpj(
          binds.cnpj.getValue(),
        );
        this.companyDomainService.validateCompanyExistsUpdate(
          company,
          existingCompany,
        );
        company.changeCnpj(binds.cnpj);
      }
    }

    if (binds.companyTypes) {
      company.companyTypes = [];
      company.changeCompanyTypes(binds.companyTypes);
      await this.companyRepository.updateRelations(company);
    }

    company.userUpdated = userUpdating;

    delete (company as any).companyTypes;

    await this.companyRepository.update(company.uuid, company);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const company = await this.findOneCompanyUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.companyDomainService.validateCompanySameStatus(company, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      company.activate();
    } else {
      company.deactivate();
    }

    company.userUpdated = userUpdating;

    delete (company as any).companyTypes;
    await this.companyRepository.update(company.uuid, company);
  }
}
