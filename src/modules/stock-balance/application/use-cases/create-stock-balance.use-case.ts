import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { FindOneStockBalanceUseCase } from './find-one-stock-balance.use-case';
import { UpdateStockBalanceUseCase } from './update-stock-balance.use-case';
import { StockBalanceDomainService } from '../../domain/services/stock-balance-domain.service';
import { StockBalanceCreateDto } from '../dtos/stock-balance-create.dto';
import { StockBalanceQuantity } from '../../domain/value-objects/stock-balance-quantity.vo';

@Injectable()
export class CreateStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
    private readonly findOneStockBalanceUseCase: FindOneStockBalanceUseCase,
    private readonly updateStockBalanceUseCase: UpdateStockBalanceUseCase,
    private readonly stockBalanceDomainService: StockBalanceDomainService,
  ) {}

  async execute(
    dto: StockBalanceCreateDto,
    entityManager: EntityManager,
  ): Promise<void> {
    await this.upsert(dto, entityManager);
  }

  private async upsert(
    dto: StockBalanceCreateDto,
    entityManager: EntityManager,
  ): Promise<void> {
    const binds = {
      item: dto.item,
      batch: dto.batch,
      stockLocation: dto.stockLocation,
      quantity: StockBalanceQuantity.create(dto.quantity),
      type: dto.type,
    };

    this.stockBalanceDomainService.validateBatchDate(binds.batch);

    const existingStockBalance =
      await this.findOneStockBalanceUseCase.findByBatchAndStockLocationAndItem(
        binds.batch,
        binds.stockLocation,
        binds.item,
      );

    if (existingStockBalance) {
      await this.updateStockBalanceUseCase.execute(
        existingStockBalance,
        dto,
        entityManager,
      );

      return;
    }

    this.stockBalanceDomainService.validateOperationTypeCreate(binds.type);

    await this.stockBalanceRepository.create(
      {
        item: binds.item,
        batch: binds.batch,
        stockLocation: binds.stockLocation,
        quantity: binds.quantity.getValue(),
      },
      entityManager,
    );
  }
}
