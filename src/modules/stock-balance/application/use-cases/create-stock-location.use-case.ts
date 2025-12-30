import { Inject, Injectable } from '@nestjs/common';

import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { FindOneStockBalanceUseCase } from './find-one-stock-balance.use-case';
import { UpdateStockBalanceUseCase } from './update-stock-balance.use-case';
import { StockBalanceDomainService } from '../../domain/services/stock-balance-domain.service';
import { StockBalanceCreateDto } from '../dtos/stock-balance-create.dto';
import { FindOneItemUseCase } from 'src/modules/item/application/use-cases/find-one-item.use-case';
import { FindOneBatchUseCase } from 'src/modules/batch/application/use-cases/find-one-batch.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { StockBalanceQuantity } from '../../domain/value-objects/stock-balance-quantity.vo';
import { UUID } from 'crypto';

@Injectable()
export class CreateStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
    private readonly findOneStockBalanceUseCase: FindOneStockBalanceUseCase,
    private readonly updateStockBalanceUseCase: UpdateStockBalanceUseCase,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockBalanceDomainService: StockBalanceDomainService,
  ) {}

  async execute(dto: StockBalanceCreateDto): Promise<void> {
    await this.upsert(dto);
  }

  private async upsert(dto: StockBalanceCreateDto): Promise<void> {
    const binds = {
      item: await this.findOneItemUseCase.findEntityByUuid(dto.item),
      batch: await this.findOneBatchUseCase.findEntityByUuid(dto.batch),
      stockLocation: await this.findOneStockLocationUseCase.findEntityByUuid(
        dto.stockLocation,
      ),
      quantity: StockBalanceQuantity.create(dto.quantity),
      type: dto.type,
    };

    const existingStockBalance =
      await this.findOneStockBalanceUseCase.findByBatchAndStockLocationAndItem(
        binds.batch,
        binds.stockLocation,
        binds.item,
      );

    if (existingStockBalance) {
      await this.updateStockBalanceUseCase.execute(
        existingStockBalance.uuid,
        dto,
      );
      return;
    }

    this.stockBalanceDomainService.validateOperationTypeCreate(binds.type);

    await this.stockBalanceRepository.create({
      item: binds.item,
      batch: binds.batch,
      stockLocation: binds.stockLocation,
      quantity: binds.quantity.getValue(),
    });
  }
}
