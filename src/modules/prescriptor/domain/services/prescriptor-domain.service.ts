import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEntity } from '../entities/advice.entity';
import { PrescriptorNotFoundException } from '../exceptions/prescriptor-not-found.exception';
import { AdviceNotFoundException } from '../exceptions/advice-not-found.exception';
import { PrescriptorAlreadyExistsException } from '../exceptions/prescriptor-already-exists.exception';

@Injectable()
export class PrescriptorDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validatePrescriptor(
    prescriptor: PrescriptorEntity | null,
  ): PrescriptorEntity {
    if (!prescriptor) {
      throw new PrescriptorNotFoundException();
    }

    return prescriptor;
  }

  validatePrescriptorAndEnsureActive(
    prescriptor: PrescriptorEntity | null,
  ): PrescriptorEntity {
    const validated = this.validatePrescriptor(prescriptor);
    validated.ensureIsActive();

    return validated;
  }

  validatePrescriptorSameStatus(
    prescriptor: PrescriptorEntity,
    status: StatusEnum,
  ): void {
    this.baseDomainService.validateDifferentStatus(prescriptor, status);
  }

  validateAdvice(advice: AdviceEntity | null): AdviceEntity {
    if (!advice) {
      throw new AdviceNotFoundException();
    }

    return advice;
  }

  validatePrescriptorExistsCreate(prescriptor: PrescriptorEntity | null): void {
    if (prescriptor) {
      throw new PrescriptorAlreadyExistsException();
    }
  }

  validatePrescriptorExistsUpdate(
    updatePrescriptor: PrescriptorEntity | null,
    existingPrescriptor: PrescriptorEntity | null,
  ): void {
    if (
      updatePrescriptor &&
      existingPrescriptor &&
      existingPrescriptor.uuid !== updatePrescriptor.uuid
    ) {
      throw new PrescriptorAlreadyExistsException();
    }
  }
}
