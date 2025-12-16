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
import { RegistrationNumber } from '../../domain/value-objects/registration-number.vo';
import { State } from '../../domain/value-objects/state.vo';
import { PrescriptorAlreadyExistsException } from '../../domain/exceptions/prescriptor-already-exists.exception';

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
    const user = await this.findOneUserUseCase.findById(userId);
    const prescriptor =
      await this.findOnePrescriptorUseCase.findEntityByUuid(uuid);

    let newAdvice = prescriptor.advice;
    let adviceChanged = false;

    if (dto.advice) {
      newAdvice = await this.findOneAdviceUseCase.findByAcronym(dto.advice);
      adviceChanged = newAdvice.id !== prescriptor.advice.id;
    }

    let newRegistrationNumber = prescriptor.registrationNumber;
    let registrationNumberChanged = false;

    if (dto.registrationNumber) {
      const registrationNumberVO = RegistrationNumber.create(
        dto.registrationNumber,
      );
      const currentRegistrationNumberVO = RegistrationNumber.create(
        prescriptor.registrationNumber,
      );

      registrationNumberChanged = !registrationNumberVO.equals(
        currentRegistrationNumberVO,
      );
      newRegistrationNumber = registrationNumberVO.getValue();
    }

    if (adviceChanged || registrationNumberChanged) {
      const existingPrescriptor =
        await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
          newRegistrationNumber,
          newAdvice.id,
        );

      if (existingPrescriptor && existingPrescriptor.id !== prescriptor.id) {
        throw new PrescriptorAlreadyExistsException();
      }
    }

    if (dto.name) {
      const name = PrescriptorName.create(dto.name);
      prescriptor.changeName(name);
    }

    if (dto.registrationNumber) {
      const registrationNumberVO = RegistrationNumber.create(
        dto.registrationNumber,
      );
      prescriptor.changeRegistrationNumber(registrationNumberVO);
    }

    if (dto.state) {
      const state = State.create(dto.state);
      prescriptor.changeState(state);
    }

    if (dto.specialty !== undefined) {
      prescriptor.changeSpecialty(dto.specialty);
    }

    if (dto.advice) {
      prescriptor.changeAdvice(newAdvice);
    }

    prescriptor.userUpdated = user;

    await this.prescriptorRepository.update(prescriptor);
  }

  async updateStatus(
    uuid: UUID,
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

    if (dto.status === StatusEnum.ATIVO) {
      prescriptor.activate();
    } else {
      prescriptor.deactivate();
    }

    prescriptor.userUpdated = user;

    await this.prescriptorRepository.update(prescriptor);
  }
}
