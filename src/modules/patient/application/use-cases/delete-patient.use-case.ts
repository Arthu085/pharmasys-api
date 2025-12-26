import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { FindOnePatientUseCase } from './find-one-patient.use-case';

@Injectable()
export class DeletePatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOnePatientUseCase.findEntityByUuid(uuid, false);
    await this.patientRepository.softDelete(uuid);
  }
}
