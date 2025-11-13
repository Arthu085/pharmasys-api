import { Injectable } from '@nestjs/common';
import { PrescriptorRepository } from '../../infraestructure/repositories/prescriptor.repository';
import { PrescriptorUpdateDto } from '../dtos/prescriptor-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { FindOneAdviceUseCase } from './find-one-advice.use-case';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Injectable()
export class UpdatePrescriptorUseCase {
  constructor(
    private readonly prescriptorRepository: PrescriptorRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly findOneAdviceUseCase: FindOneAdviceUseCase,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(
    uuid: string,
    dto: PrescriptorUpdateDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const prescriptor =
      await this.findOnePrescriptorUseCase.findEntityByUuid(uuid);

    let newAdvice = prescriptor.advice;
    if (dto.advice) {
      newAdvice = await this.findOneAdviceUseCase.findByAcronym(dto.advice);
    }

    let newRegistrationNumber = prescriptor.registrationNumber;
    if (dto.registrationNumber) {
      newRegistrationNumber = dto.registrationNumber;
    }

    if (dto.registrationNumber || dto.advice) {
      const existingPrescriptor =
        await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
          newRegistrationNumber,
          newAdvice.id,
        );

      if (existingPrescriptor && existingPrescriptor.id !== prescriptor.id) {
        this.prescriptorDomainService.validatePrescriptorSameRegistrationNumber();
      }
    }

    Object.assign(prescriptor, dto);

    if (dto.advice) {
      prescriptor.advice = newAdvice;
    }

    prescriptor.userUpdated = user;
    prescriptor.updatedAt = new Date();

    await this.prescriptorRepository.update(prescriptor);
  }

  async updateStatus(
    uuid: string,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const prescriptor = await this.findOnePrescriptorUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.prescriptorDomainService.validatePrescriptorSameStatus(
      prescriptor,
      dto.status,
    );

    prescriptor.status = dto.status;
    prescriptor.userUpdated = user;
    prescriptor.updatedAt = new Date();

    await this.prescriptorRepository.update(prescriptor);
  }
}
