import { Injectable } from '@nestjs/common';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { PrescriptorEntity } from '../entities/prescriptor.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEntity } from '../entities/advice.entity';
import { ExistingGenericException } from 'src/shared/exceptions/existing.exception';

@Injectable()
export class PrescriptorDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validatePrescriptor(
    prescriptor: PrescriptorEntity | null,
  ): PrescriptorEntity {
    return this.baseDomainService.validateEntityExists(
      prescriptor,
      'Prescritor',
      'o',
    );
  }

  validatePrescriptorStatus(prescriptor: PrescriptorEntity): PrescriptorEntity {
    return this.baseDomainService.validateEntityActive(
      prescriptor,
      'Prescritor',
      'o',
    );
  }

  validatePrescriptorSameStatus(
    prescriptor: PrescriptorEntity,
    status: StatusEnum,
  ): void {
    this.baseDomainService.validateDifferentStatus(prescriptor, status);
  }

  validateAdvice(advice: AdviceEntity | null): AdviceEntity {
    return this.baseDomainService.validateEntityExists(advice, 'Conselho', 'o');
  }

  validatePrescriptorSameRegistrationNumber(): void {
    throw new ExistingGenericException('prescritor', 'o');
  }
}
