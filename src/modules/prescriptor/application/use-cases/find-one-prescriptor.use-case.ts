import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { plainToInstance } from 'class-transformer';
import { PrescriptorEntity } from '../../domain/entities/prescriptor.entity';
import { PrescriptorResponseOneDto } from '../dtos/prescriptor-response-one.dto';

@Injectable()
export class FindOnePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(uuid: UUID): Promise<PrescriptorResponseOneDto> {
    const prescriptor = await this.prescriptorRepository.findOne(uuid);
    this.prescriptorDomainService.validatePrescriptorAndEnsureActive(
      prescriptor,
    );

    return plainToInstance(PrescriptorResponseOneDto, prescriptor, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<PrescriptorEntity> {
    const prescriptor = await this.prescriptorRepository.findOne(uuid);

    if (validateActive) {
      return this.prescriptorDomainService.validatePrescriptorAndEnsureActive(
        prescriptor,
      );
    }

    return this.prescriptorDomainService.validatePrescriptor(prescriptor);
  }

  async findByRegistrationNumberAndAdvice(
    registrationNumber: string,
    adviceId: number,
  ): Promise<PrescriptorEntity | null> {
    return await this.prescriptorRepository.findByRegistrationNumberAndAdvice(
      registrationNumber,
      adviceId,
    );
  }
}
