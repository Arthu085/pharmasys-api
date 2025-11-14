import { Injectable } from '@nestjs/common';
import { PrescriptorRepository } from '../../infraestructure/repositories/prescriptor.repository';
import { PrescriptorResponseDto } from '../dtos/prescriptor-response.dto';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { plainToInstance } from 'class-transformer';
import { PrescriptorEntity } from '../../domain/entities/prescriptor.entity';

@Injectable()
export class FindOnePrescriptorUseCase {
  constructor(
    private readonly prescriptorRepository: PrescriptorRepository,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(uuid: string): Promise<PrescriptorResponseDto> {
    const prescriptor = await this.prescriptorRepository.findOne(uuid);
    const validatedPrescriptor =
      this.prescriptorDomainService.validatePrescriptorAndEnsureActive(
        prescriptor,
      );

    return plainToInstance(PrescriptorResponseDto, validatedPrescriptor, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
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
