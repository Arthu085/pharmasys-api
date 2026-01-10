import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IItemDispensationItemRepository } from '../../domain/repositories/item-dispensation-item.repository.interface';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { CreateStockBalanceUseCase } from 'src/modules/stock-balance/application/use-cases/create-stock-balance.use-case';
import { ItemDispensationItemCreateDto } from '../dtos/item-dispensation-item-create.dto';
import { ItemDispensationEntity } from '../../domain/entities/item-dispensation.entity';
import { StockBalanceOperationType } from 'src/modules/stock-balance/domain/enums/stock-balance-operation-type.enum';
import { ItemDispensationItemQuantity } from '../../domain/value-objects/item-dispensation-item-quantity.vo';
import { ItemDispensationNotificationNumber } from '../../domain/value-objects/item-dispensation-notification-number.vo';
import { ItemDispensationDomainService } from '../../domain/services/item-dispensation-domain.service';

@Injectable()
export class CreateItemDispensationItemUseCase {
  constructor(
    @Inject(IItemDispensationItemRepository)
    private readonly itemDispensationItemRepository: IItemDispensationItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly createStockBalanceUseCase: CreateStockBalanceUseCase,
    private readonly itemDispensationDomainService: ItemDispensationDomainService,
  ) {}

  async execute(
    dto: ItemDispensationItemCreateDto,
    itemDispensation: ItemDispensationEntity,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      itemDispensation: itemDispensation,
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      quantity: ItemDispensationItemQuantity.create(dto.quantity),
      isPsychotropic: dto.isPsychotropic ? dto.isPsychotropic : false,
      prescriptionNotificationNumber: dto.prescriptionNotificationNumber
        ? ItemDispensationNotificationNumber.create(
            dto.prescriptionNotificationNumber,
          )
        : null,
    };

    this.itemDispensationDomainService.validatePsychotropicAndNotificationNumber(
      binds.isPsychotropic,
      binds.prescriptionNotificationNumber?.getValue() || null,
    );

    await this.itemDispensationItemRepository.create(
      {
        itemDispensation: binds.itemDispensation,
        item: binds.item,
        batch: binds.batch,
        quantity: binds.quantity.getValue(),
        isPsychotropic: binds.isPsychotropic,
        prescriptionNotificationNumber:
          binds.prescriptionNotificationNumber?.getValue() || null,
      },
      entityManager,
    );

    await this.createStockBalanceUseCase.execute(
      {
        item: binds.item,
        batch: binds.batch,
        stockLocation: binds.itemDispensation.stockLocation,
        quantity: binds.quantity.getValue(),
        type: StockBalanceOperationType.SUBTRACT,
      },
      null,
      entityManager,
    );
  }
}
