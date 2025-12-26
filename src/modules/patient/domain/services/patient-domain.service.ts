import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { PatientEntity } from '../entities/patient.entity';
import { PatientNotFoundException } from '../exceptions/patient-not-found.exception';
import { PatientAlreadyExistsException } from '../exceptions/patient-already-exists.exception';

@Injectable()
export class PatientDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validatePatient(patient: PatientEntity | null): PatientEntity {
    if (!patient) {
      throw new PatientNotFoundException();
    }

    return patient;
  }

  validatePatientAndEnsureActive(patient: PatientEntity | null): PatientEntity {
    const validated = this.validatePatient(patient);
    validated.ensureIsActive();

    return validated;
  }

  validatePatientSameStatus(patient: PatientEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(patient, status);
  }

  validatePatientExistsCreate(patient: PatientEntity | null): void {
    if (patient) {
      throw new PatientAlreadyExistsException();
    }
  }

  validatePatientExistsUpdate(
    updatePatient: PatientEntity | null,
    existingPatient: PatientEntity | null,
  ): void {
    if (
      updatePatient &&
      existingPatient &&
      existingPatient.uuid !== updatePatient.uuid
    ) {
      throw new PatientAlreadyExistsException();
    }
  }
}
