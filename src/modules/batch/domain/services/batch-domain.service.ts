import { Injectable } from '@nestjs/common';

import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { BatchEntity } from '../entities/batch.entity';
import { BatchNotFoundException } from '../exceptions/batch-not-found.exception';
import { BatchAlreadyExistsException } from '../exceptions/batch-already-exists.exception';

@Injectable()
export class BatchDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateBatch(batch: BatchEntity | null): BatchEntity {
    if (!batch) {
      throw new BatchNotFoundException();
    }

    return batch;
  }

  validateBatchAndEnsureActive(batch: BatchEntity | null): BatchEntity {
    const validated = this.validateBatch(batch);
    validated.ensureIsActive();

    return validated;
  }

  validateBatchSameStatus(batch: BatchEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(batch, status);
  }

  validateBatchExistsCreate(batch: BatchEntity | null): void {
    if (batch) {
      throw new BatchAlreadyExistsException();
    }
  }

  validateBatchExistsUpdate(
    updateBatch: BatchEntity | null,
    existingBatch: BatchEntity | null,
  ): void {
    if (updateBatch && existingBatch && updateBatch.id !== existingBatch.id) {
      throw new BatchAlreadyExistsException();
    }
  }
}
