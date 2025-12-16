import { Inject, Injectable } from '@nestjs/common';
import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { PrescriptorCreateDto } from '../dtos/prescriptor-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneAdviceUseCase } from './find-one-advice.use-case';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { PrescriptorName } from '../../domain/value-objects/prescriptor-name.vo';
import { RegistrationNumber } from '../../domain/value-objects/registration-number.vo';
import { State } from '../../domain/value-objects/state.vo';
import { PrescriptorAlreadyExistsException } from '../../domain/exceptions/prescriptor-already-exists.exception';

@Injectable()
export class CreatePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneAdviceUseCase: FindOneAdviceUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
  ) {}

  async execute(dto: PrescriptorCreateDto, userId: number): Promise<void> {
    const name = PrescriptorName.create(dto.name);
    const registrationNumber = RegistrationNumber.create(
      dto.registrationNumber,
    );
    const state = State.create(dto.state);
    const user = await this.findOneUserUseCase.findById(userId);
    const advice = await this.findOneAdviceUseCase.findByAcronym(dto.advice);
    const existingPrescriptor =
      await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
        registrationNumber.getValue(),
        advice.id,
      );

    if (existingPrescriptor) {
      throw new PrescriptorAlreadyExistsException();
    }

    await this.prescriptorRepository.create({
      ...dto,
      name: name.getValue(),
      registrationNumber: registrationNumber.getValue(),
      state: state.getValue(),
      userCreated: user,
      advice: advice,
    });
  }
}
