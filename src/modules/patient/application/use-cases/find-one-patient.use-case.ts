import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { plainToInstance } from 'class-transformer';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { PatientDomainService } from '../../domain/services/patient-domain.service';
import { PatientResponseOneDto } from '../dtos/patient-response-one.dto';
import { PatientEntity } from '../../domain/entities/patient.entity';

@Injectable()
export class FindOnePatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly patientDomainService: PatientDomainService,
  ) {}

  async execute(uuid: UUID): Promise<PatientResponseOneDto> {
    const patient = await this.patientRepository.findOne(uuid);
    this.patientDomainService.validatePatientAndEnsureActive(patient);

    return plainToInstance(PatientResponseOneDto, patient, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<PatientEntity> {
    const patient = await this.patientRepository.findOne(uuid);

    if (validateActive) {
      return this.patientDomainService.validatePatientAndEnsureActive(patient);
    }

    return this.patientDomainService.validatePatient(patient);
  }

  async findByDocument(document: string): Promise<PatientEntity | null> {
    return await this.patientRepository.findByDocument(document);
  }
}
