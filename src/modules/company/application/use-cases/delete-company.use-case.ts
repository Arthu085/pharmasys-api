import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { ICompanyRepository } from '../../domain/repositories/company.repository.interface';
import { FindOneCompanyUseCase } from './find-one-company.use-case';

@Injectable()
export class DeleteCompanyUseCase {
  constructor(
    @Inject(ICompanyRepository)
    private readonly companyRepository: ICompanyRepository,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneCompanyUseCase.findEntityByUuid(uuid, false);
    await this.companyRepository.softDelete(uuid);
  }
}
