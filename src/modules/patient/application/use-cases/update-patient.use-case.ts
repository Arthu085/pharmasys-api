import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { IPatientRepository } from '../../domain/repositories/patient.repository.interface';
import { FindOnePatientUseCase } from './find-one-patient.use-case';
import { PatientUpdateDto } from '../dtos/patient-update.dto';
import { PatientName } from '../../domain/values-objects/patient-name.vo';
import { PatientDocument } from '../../domain/values-objects/patient-document.vo';
import { PatientDomainService } from '../../domain/services/patient-domain.service';

@Injectable()
export class UpdatePatientUseCase {
  constructor(
    @Inject(IPatientRepository)
    private readonly patientRepository: IPatientRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
    private readonly patientDomainService: PatientDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: PatientUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      name: dto.name ? PatientName.create(dto.name) : undefined,
      document: dto.document ? PatientDocument.create(dto.document) : undefined,
    };

    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const patient = await this.findOnePatientUseCase.findEntityByUuid(uuid);

    this.patientDomainService.validatePatientAndEnsureActive(patient);

    if (binds.name) {
      patient.changeName(binds.name);
    }

    if (binds.document) {
      const currentDocument = PatientDocument.create(patient.document);
      if (!binds.document.equals(currentDocument)) {
        const existingPatientWithDocument =
          await this.findOnePatientUseCase.findByDocument(
            binds.document.getValue(),
          );
        this.patientDomainService.validatePatientExistsUpdate(
          patient,
          existingPatientWithDocument,
        );
        patient.changeDocument(binds.document);
      }
    }

    patient.userUpdated = userUpdating;

    await this.patientRepository.update(patient.uuid, patient);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const patient = await this.findOnePatientUseCase.findEntityByUuid(
      uuid,
      false,
    );

    this.patientDomainService.validatePatientSameStatus(patient, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      patient.activate();
    } else {
      patient.deactivate();
    }

    patient.userUpdated = userUpdating;

    await this.patientRepository.update(patient.uuid, patient);
  }
}
