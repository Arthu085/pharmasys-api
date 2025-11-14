import { Inject, Injectable } from '@nestjs/common';
import { IPrescriptorRepository } from '../../domain/repositories/prescriptor.repository.interface';
import { FindOnePrescriptorUseCase } from './find-one-prescriptor.use-case';

@Injectable()
export class DeletePrescriptorUseCase {
  constructor(
    @Inject(IPrescriptorRepository)
    private readonly prescriptorRepository: IPrescriptorRepository,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
  ) {}

  async execute(uuid: string): Promise<void> {
    await this.findOnePrescriptorUseCase.findEntityByUuid(uuid, false);
    await this.prescriptorRepository.softDelete(uuid);
  }
}
