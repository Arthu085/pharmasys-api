import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { ITransferRequestItemRepository } from '../../domain/repositories/transfer-request-item.repository.interface';
import { TransferRequestItemCreateDto } from '../dtos/transfer-request-item-create.dto';
import { TransferRequestEntity } from '../../domain/entities/transfer-request.entity';
import { TransferRequestItemQuantity } from '../../domain/value-objects/transfer-request-item-quantity.vo';
import { TransferStatusItemEnum } from '../../domain/enums/transfer-status-item.enum';

@Injectable()
export class CreateTransferRequestItemUseCase {
  constructor(
    @Inject(ITransferRequestItemRepository)
    private readonly transferRequestItemRepository: ITransferRequestItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
  ) {}

  async execute(
    dto: TransferRequestItemCreateDto,
    transferRequest: TransferRequestEntity,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      transferRequest: transferRequest,
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      quantity: TransferRequestItemQuantity.create(dto.quantity),
    };

    await this.transferRequestItemRepository.create(
      {
        transferRequest: binds.transferRequest,
        item: binds.item,
        batch: binds.batch,
        quantity: binds.quantity.getValue(),
        statusTransferItem: TransferStatusItemEnum.ABERTO,
        userCreated: transferRequest.userCreated,
      },
      entityManager,
    );
  }
}
