import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { FindOneBatchUseCase } from './find-one-batch.use-case';

@Injectable()
export class DeleteBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneBatchUseCase.findEntityByUuid(uuid, false);
    await this.batchRepository.softDelete(uuid);
  }
}
