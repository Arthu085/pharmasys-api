import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEntity } from '../entities/advice.entity';
import { PrescriptorNotFoundException } from '../exceptions/prescriptor-not-found.exception';
import { PrescriptorInactiveException } from '../exceptions/prescriptor-inactive.exception';
import { PrescriptorAlreadyExistsException } from '../exceptions/prescriptor-already-exists.exception';
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

  validatePrescriptorStatus(prescriptor: PrescriptorEntity): PrescriptorEntity {
    if (prescriptor.status === StatusEnum.INATIVO) {
      throw new PrescriptorInactiveException();
    }

    return prescriptor;
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

  validatePrescriptorSameRegistrationNumber(): void {
    throw new PrescriptorAlreadyExistsException();
  }
}
