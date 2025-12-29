import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { StockBalanceResponseOneDto } from '../dtos/stock-balance-response-one.dto';
import { StockBalanceEntity } from '../../domain/entities/stock-balance.entity';
import { StockBalanceDomainService } from '../../domain/services/stock-balance-domain.service';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';

@Injectable()
export class FindOneStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
    private readonly stockBalanceDomainService: StockBalanceDomainService,
  ) {}

  async execute(uuid: UUID): Promise<StockBalanceResponseOneDto> {
    const stockBalance = await this.stockBalanceRepository.findOne(uuid);
    this.stockBalanceDomainService.validateStockBalance(stockBalance);

    return plainToInstance(StockBalanceResponseOneDto, stockBalance, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(uuid: UUID): Promise<StockBalanceEntity> {
    const stockBalance = await this.stockBalanceRepository.findOne(uuid);

    return this.stockBalanceDomainService.validateStockBalance(stockBalance);
  }

  async findByBatchAndStockLocation(
    batch: BatchEntity,
    stockLocation: StockLocationEntity,
  ): Promise<StockBalanceEntity | null> {
    return await this.stockBalanceRepository.findByBatchAndStockLocation(
      batch,
      stockLocation,
    );
  }
}
