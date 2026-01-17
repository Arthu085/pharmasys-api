import { Inject } from '@nestjs/common';
import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { ITransferRequestItemRepository } from '../../domain/repositories/transfer-request-item.repository.interface';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneTransferRequestItemUseCase } from './find-one-transfer-request-item.use-case';
import { TransferRequestItemUpdateDto } from '../dtos/transfer-request-item-update.dto';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { TransferRequestItemQuantity } from '../../domain/value-objects/transfer-request-item-quantity.vo';
import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { TransferRequestItemUpdateStatusDto } from '../dtos/transfer-request-item-update-status.dto';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TransferStatusItemEnum } from '../../domain/enums/transfer-status-item.enum';
import { TransferRequestItemEntity } from '../../domain/entities/transfer-request-item.entity';
import { CreateStockTransferUseCase } from 'src/modules/stock-transfer/application/use-cases/create-stock-transfer.use-case';
import { TransferRequestEntity } from '../../domain/entities/transfer-request.entity';

export class UpdateTransferRequestItemUseCase {
  constructor(
    @Inject(ITransferRequestItemRepository)
    private readonly transferRequestItemRepository: ITransferRequestItemRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly findOneTransferRequestItemUseCase: FindOneTransferRequestItemUseCase,
    private readonly createStockTransferUseCase: CreateStockTransferUseCase,
    private readonly transferRequestDomainService: TransferRequestDomainService,
  ) {}

  async execute(
    uuid: UUID,
    dto: TransferRequestItemUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      item: dto.item
        ? await this.findOneItemUseCase.findEntityByUuid(dto.item)
        : undefined,
      batch: dto.batch
        ? await this.findOneBatchUseCase.findEntityByUuid(dto.batch)
        : undefined,
      quantity: dto.quantity
        ? TransferRequestItemQuantity.create(dto.quantity)
        : undefined,
    };

    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const transferRequestItem =
      await this.findOneTransferRequestItemUseCase.findEntityByUuid(uuid);

    this.transferRequestDomainService.validateTransferRequestItemStatus(
      transferRequestItem.statusTransferItem,
    );

    this.transferRequestDomainService.validateTransferRequestItemUser(
      transferRequestItem.userCreated,
      userUpdating,
    );

    if (binds.item) {
      transferRequestItem.changeItem(binds.item);
    }

    if (binds.batch) {
      transferRequestItem.changeBatch(binds.batch);
    }

    if (binds.quantity) {
      transferRequestItem.changeQuantity(binds.quantity);
    }

    transferRequestItem.userUpdated = userUpdating;

    await this.transferRequestItemRepository.update(
      transferRequestItem.uuid,
      transferRequestItem,
    );
  }

  async updateStatusTransferItem(
    transferRequestItems: TransferRequestItemEntity[],
    transferRequest: TransferRequestEntity,
    dto: TransferRequestItemUpdateStatusDto,
    user: UserEntity,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      statusTransferItem: dto.statusTransferItem,
    };

    const userUpdating = user;

    switch (binds.statusTransferItem) {
      case TransferStatusItemEnum.SEPARACAO:
        for (const item of transferRequestItems) {
          await this.transferRequestItemRepository.updateStatus(
            item.uuid,
            TransferStatusItemEnum.SEPARACAO,
            userUpdating,
          );
        }
        break;
      case TransferStatusItemEnum.FINALIZADO:
        for (const item of transferRequestItems) {
          await this.transferRequestItemRepository.updateStatus(
            item.uuid,
            TransferStatusItemEnum.FINALIZADO,
            userUpdating,
          );
          await this.createStockTransferUseCase.execute(
            {
              transferDate: transferRequest.requestDate,
              origin: transferRequest.origin.uuid,
              destination: transferRequest.destination.uuid,
            },
            [
              {
                item: item.item.uuid,
                batch: item.batch.uuid,
                quantity: item.quantity,
              },
            ],
            transferRequest.userCreated.id,
            transferRequest.userCreated,
            entityManager,
          );
        }
        break;
      case TransferStatusItemEnum.CANCELADO:
        for (const item of transferRequestItems) {
          await this.transferRequestItemRepository.updateStatus(
            item.uuid,
            TransferStatusItemEnum.CANCELADO,
            userUpdating,
          );
        }
        break;
      default:
        this.transferRequestDomainService.validateStatusTransferRequestItem(
          binds.statusTransferItem,
        );
        break;
    }
  }
}
