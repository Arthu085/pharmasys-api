import { Injectable } from '@nestjs/common';
import { PrescriptorRepository } from '../../infraestructure/repositories/prescriptor.repository';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';

@Injectable()
export class DeletePrescriptorUseCase {
  constructor(
    private readonly prescriptorRepository: PrescriptorRepository,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
  ) {}

  async execute(uuid: string): Promise<void> {
    await this.findOnePrescriptorUseCase.findEntityByUuid(uuid, false);
    await this.prescriptorRepository.softDelete(uuid);
  }
}
