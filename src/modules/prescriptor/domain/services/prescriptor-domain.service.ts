import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEntity } from '../entities/advice.entity';
import { PrescriptorNotFoundException } from '../exceptions/prescriptor-not-found.exception';
import { AdviceNotFoundException } from '../exceptions/advice-not-found.exception';

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
}
