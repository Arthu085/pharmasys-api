import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { plainToInstance } from 'class-transformer';
import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { BatchDomainService } from '../../domain/services/batch-domain.service';
import { BatchResponseOneDto } from '../dtos/batch-response-one.dto';
import { BatchEntity } from '../../domain/entities/batch.entity';

@Injectable()
export class FindOneBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
    private readonly batchDomainService: BatchDomainService,
  ) {}

  async execute(uuid: UUID): Promise<BatchResponseOneDto> {
    const batch = await this.batchRepository.findOne(uuid);
    this.batchDomainService.validateBatchAndEnsureActive(batch);

    return plainToInstance(BatchResponseOneDto, batch, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<BatchEntity> {
    const batch = await this.batchRepository.findOne(uuid);

    if (validateActive) {
      return this.batchDomainService.validateBatchAndEnsureActive(batch);
    }

    return this.batchDomainService.validateBatch(batch);
  }

  async findByCode(batchCode: string) {
    return this.batchRepository.findByCode(batchCode);
  }
}
