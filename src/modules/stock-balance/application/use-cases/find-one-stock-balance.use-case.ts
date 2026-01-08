import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { StockBalanceEntity } from '../../domain/entities/stock-balance.entity';
import { StockBalanceDomainService } from '../../domain/services/stock-balance-domain.service';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';

@Injectable()
export class FindOneStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
    private readonly stockBalanceDomainService: StockBalanceDomainService,
  ) {}

  async findEntityByUuid(uuid: UUID): Promise<StockBalanceEntity> {
    const stockBalance = await this.stockBalanceRepository.findOne(uuid);

    return this.stockBalanceDomainService.validateStockBalance(stockBalance);
  }

  async findByBatchAndStockLocationAndItem(
    batch: BatchEntity,
    stockLocation: StockLocationEntity,
    item: ItemEntity,
  ): Promise<StockBalanceEntity | null> {
    return await this.stockBalanceRepository.findByBatchAndStockLocationAndItem(
      batch,
      stockLocation,
      item,
    );
  }
}
