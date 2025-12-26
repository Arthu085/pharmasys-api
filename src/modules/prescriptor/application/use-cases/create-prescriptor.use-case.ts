import { Inject, Injectable } from '@nestjs/common';

import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorCreateDto } from '../dtos/prescriptor-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneAdviceUseCase } from './find-one-advice.use-case';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { PrescriptorName } from '../../domain/value-objects/prescriptor-name.vo';
import { PrescriptorRegistration } from '../../domain/value-objects/prescriptor-registration.vo';
import { PrescriptorState } from '../../domain/value-objects/prescriptor-state.vo';
import { PrescriptorSpecialty } from '../../domain/value-objects/prescriptor-specialty';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';

@Injectable()
export class CreatePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneAdviceUseCase: FindOneAdviceUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(dto: PrescriptorCreateDto, userId: number): Promise<void> {
    const binds = {
      name: PrescriptorName.create(dto.name),
      registrationNumber: PrescriptorRegistration.create(
        dto.registrationNumber,
      ),
      state: PrescriptorState.create(dto.state),
      specialty: dto.specialty
        ? PrescriptorSpecialty.create(dto.specialty)
        : null,
      advice: await this.findOneAdviceUseCase.findByAcronym(dto.advice),
    };

    const userCreating = await this.findOneUserUseCase.findById(userId);
    const existingPrescriptor =
      await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
        binds.registrationNumber.getValue(),
        binds.advice.id,
      );

    this.prescriptorDomainService.validatePrescriptorExistsCreate(
      existingPrescriptor,
    );

    await this.prescriptorRepository.create({
      name: binds.name.getValue(),
      registrationNumber: binds.registrationNumber.getValue(),
      state: binds.state.getValue(),
      specialty: binds.specialty?.getValue() || null,
      advice: binds.advice,
      userCreated: userCreating,
    });
  }
}
