import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { BatchEntity } from '../../domain/entities/batch.entity';
import { FindOneBatchUseCase } from './find-one-batch.use-case';

@Injectable()
export class DeleteBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneBatchUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(
      BatchEntity,
      uuid,
      'Lote',
    );
    await this.batchRepository.softDelete(uuid);
  }
}
