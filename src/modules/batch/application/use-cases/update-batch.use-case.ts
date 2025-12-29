import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { FindOneBatchUseCase } from './find-one-batch.use-case';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneCompanyUseCase } from 'src/modules/company/application/use-cases/find-one-company.use-case';
import { BatchDomainService } from '../../domain/services/batch-domain.service';
import { BatchUpdateDto } from '../dtos/batch-update.dto';
import { BatchCode } from '../../domain/values-objects/batch-code.vo';

@Injectable()
export class UpdateBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly batchDomainService: BatchDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: BatchUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      batchCode: dto.batchCode ? BatchCode.create(dto.batchCode) : undefined,
      item: dto.item
        ? await this.findOneItemUseCase.findEntityByUuid(dto.item)
        : undefined,
      company: dto.company
        ? await this.findOneCompanyUseCase.findEntityByUuid(dto.company)
        : undefined,
      expirationDate: dto.expirationDate ? dto.expirationDate : undefined,
    };

    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const batch = await this.findOneBatchUseCase.findEntityByUuid(uuid);

    this.batchDomainService.validateBatchAndEnsureActive(batch);

    if (binds.batchCode) {
      const currentBatchCode = BatchCode.create(batch.batchCode);

      if (!binds.batchCode.equals(currentBatchCode)) {
        const existingBatch = await this.findOneBatchUseCase.findByCode(
          binds.batchCode.getValue(),
        );
        this.batchDomainService.validateBatchExistsUpdate(batch, existingBatch);
      }
      batch.changeBatchCode(binds.batchCode);
    }

    if (binds.item) {
      batch.changeItem(binds.item);
    }

    if (binds.company) {
      batch.changeCompany(binds.company);
    }

    if (binds.expirationDate) {
      batch.changeExpirationDate(binds.expirationDate);
    }

    batch.userUpdated = userUpdating;

    await this.batchRepository.update(batch.uuid, batch);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const batch = await this.findOneBatchUseCase.findEntityByUuid(uuid, false);

    this.batchDomainService.validateBatchSameStatus(batch, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      batch.activate();
    } else {
      batch.deactivate();
    }

    batch.userUpdated = userUpdating;

    await this.batchRepository.update(batch.uuid, batch);
  }
}
