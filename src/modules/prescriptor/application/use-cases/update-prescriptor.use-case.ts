import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorUpdateDto } from '../dtos/prescriptor-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { FindOneAdviceUseCase } from './find-one-advice.use-case';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { PrescriptorName } from '../../domain/value-objects/prescriptor-name.vo';
import { PrescriptorRegistration } from '../../domain/value-objects/prescriptor-registration.vo';
import { PrescriptorState } from '../../domain/value-objects/prescriptor-state.vo';
import { PrescriptorAlreadyExistsException } from '../../domain/exceptions/prescriptor-already-exists.exception';
import { PrescriptorSpecialty } from '../../domain/value-objects/prescriptor-specialty';

@Injectable()
export class UpdatePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly findOneAdviceUseCase: FindOneAdviceUseCase,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: PrescriptorUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
      name: dto.name ? PrescriptorName.create(dto.name) : undefined,
      registrationNumber: dto.registrationNumber
        ? PrescriptorRegistration.create(dto.registrationNumber)
        : undefined,
      state: dto.state ? PrescriptorState.create(dto.state) : undefined,
      specialty: dto.specialty
        ? PrescriptorSpecialty.create(dto.specialty)
        : null,
      advice: dto.advice
        ? await this.findOneAdviceUseCase.findByAcronym(dto.advice)
        : undefined,
    };

    const prescriptor =
      await this.findOnePrescriptorUseCase.findEntityByUuid(uuid);

    this.prescriptorDomainService.validatePrescriptorAndEnsureActive(
      prescriptor,
    );

    if (binds.name) {
      prescriptor.changeName(binds.name);
    }

    if (binds.registrationNumber) {
      const currentRegistrationNumber = PrescriptorRegistration.create(
        prescriptor.registrationNumber,
      );
      if (!binds.registrationNumber.equals(currentRegistrationNumber)) {
        const existingPrescriptorWithRegistrationNumber =
          await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
            binds.registrationNumber.getValue(),
            prescriptor.advice.id,
          );
        this.prescriptorDomainService.validatePrescriptorExistsUpdate(
          prescriptor,
          existingPrescriptorWithRegistrationNumber,
        );
        prescriptor.changeRegistrationNumber(binds.registrationNumber);
      }
    }

    if (binds.advice) {
      const currentAdvice = prescriptor.advice;
      if (binds.advice.id !== currentAdvice.id) {
        const existingPrescriptorWithAdvice =
          await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
            prescriptor.registrationNumber,
            binds.advice.id,
          );
        this.prescriptorDomainService.validatePrescriptorExistsUpdate(
          prescriptor,
          existingPrescriptorWithAdvice,
        );
        prescriptor.changeAdvice(binds.advice);
      }
    }

    if (binds.state) {
      prescriptor.changeState(binds.state);
    }

    prescriptor.changeSpecialty(binds.specialty);

    prescriptor.userUpdated = binds.userUpdated;

    await this.prescriptorRepository.update(prescriptor.uuid, prescriptor);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
    };

    const prescriptor = await this.findOnePrescriptorUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.prescriptorDomainService.validatePrescriptorSameStatus(
      prescriptor,
      dto.status,
    );

    if (dto.status === StatusEnum.ATIVO) {
      prescriptor.activate();
    } else {
      prescriptor.deactivate();
    }

    prescriptor.userUpdated = binds.userUpdated;

    await this.prescriptorRepository.update(prescriptor.uuid, prescriptor);
  }
}
