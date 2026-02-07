import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { FindOneCompanyUseCase } from './find-one-company.use-case';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { CompanyEntity } from '../../domain/entities/company.entity';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneCompanyUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(
      CompanyEntity,
      uuid,
      'Empresa',
    );
    await this.companyRepository.softDelete(uuid);
  }
}
