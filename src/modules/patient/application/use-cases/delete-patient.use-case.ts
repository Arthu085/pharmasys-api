import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { FindOnePatientUseCase } from './find-one-patient.use-case';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { PatientEntity } from '../../domain/entities/patient.entity';

@Injectable()
export class DeletePatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOnePatientUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(
      PatientEntity,
      uuid,
      'Paciente',
    );
    await this.patientRepository.softDelete(uuid);
  }
}
