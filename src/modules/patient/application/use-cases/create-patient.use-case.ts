import { Inject, Injectable } from '@nestjs/common';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { PatientCreateDto } from '../dtos/patient-create.dto';
import { PatientName } from '../../domain/values-objects/patient-name.vo';
import { PatientDocument } from '../../domain/values-objects/patient-document.vo';
import { PatientDomainService } from '../../domain/services/patient-domain.service';
import { FindOnePatientUseCase } from './find-one-patient.use-case';

@Injectable()
export class CreatePatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
    private readonly patientDomainService: PatientDomainService,
  ) {}

  async execute(dto: PatientCreateDto, userId: number): Promise<void> {
    const binds = {
      userCreated: await this.findOneUserUseCase.findById(userId),
      name: PatientName.create(dto.name),
      document: PatientDocument.create(dto.document),
    };

    const existingPatient = await this.findOnePatientUseCase.findByDocument(
      binds.document.getValue(),
    );

    this.patientDomainService.validatePatientExistsCreate(existingPatient);

    await this.patientRepository.create({
      ...binds,
      name: binds.name.getValue(),
      document: binds.document.getValue(),
    });
  }
}
