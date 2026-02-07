import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { PrescriptorEntity } from '../../domain/entities/prescriptor.entity';

@Injectable()
export class DeletePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOnePrescriptorUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(
      PrescriptorEntity,
      uuid,
      'Prescritor',
    );
    await this.prescriptorRepository.softDelete(uuid);
  }
}
