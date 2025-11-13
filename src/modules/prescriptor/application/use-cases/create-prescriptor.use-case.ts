import { Injectable } from '@nestjs/common';
import { PrescriptorRepository } from '../../infraestructure/repositories/prescriptor.repository';
import { PrescriptorCreateDto } from '../dtos/prescriptor-create.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneAdviceUseCase } from './find-one-advice.use-case';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';
import { PrescriptorDomainService } from '../../domain/services/prescriptor-domain.service';

@Injectable()
export class CreatePrescriptorUseCase {
  constructor(
    private readonly prescriptorRepository: PrescriptorRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneAdviceUseCase: FindOneAdviceUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly prescriptorDomainService: PrescriptorDomainService,
  ) {}

  async execute(dto: PrescriptorCreateDto, userId: number): Promise<void> {
    const user = await this.findOneUserUseCase.findById(userId);
    const advice = await this.findOneAdviceUseCase.findByAcronym(dto.advice);
    const existingPrescriptor =
      await this.findOnePrescriptorUseCase.findByRegistrationNumberAndAdvice(
        dto.registrationNumber,
        advice.id,
      );

    if (existingPrescriptor) {
      this.prescriptorDomainService.validatePrescriptorSameRegistrationNumber();
    }

    await this.prescriptorRepository.create({
      ...dto,
      userCreated: user,
      advice: advice,
    });
  }
}
