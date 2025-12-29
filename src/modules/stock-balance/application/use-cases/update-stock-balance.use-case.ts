import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { FindOneStockBalanceUseCase } from './find-one-stock-balance.use-case';
import { StockBalanceDomainService } from '../../domain/services/stock-balance-domain.service';
import { StockBalanceUpdateDto } from '../dtos/stock-balance-update.dto';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { StockBalanceQuantity } from '../../domain/value-objects/stock-balance-quantity.vo';

@Injectable()
export class UpdateStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
    private readonly findOneStockBalanceUseCase: FindOneStockBalanceUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly stockBalanceDomainService: StockBalanceDomainService,
  ) {}

  async execute(uuid: UUID, dto: StockBalanceUpdateDto): Promise<void> {
    const binds = {
      stockLocation: dto.stockLocation
        ? await this.findOneStockLocationUseCase.findEntityByUuid(
            dto.stockLocation,
          )
        : undefined,
      quantity: dto.quantity
        ? StockBalanceQuantity.create(dto.quantity)
        : undefined,
    };

    const stockBalance =
      await this.findOneStockBalanceUseCase.findEntityByUuid(uuid);

    this.stockBalanceDomainService.validateStockBalance(stockBalance);

    if (binds.stockLocation) {
      const currentStockLocation = stockBalance.stockLocation;
      if (binds.stockLocation.uuid !== currentStockLocation.uuid) {
        const existingStockBalanceWithStockLocation =
          await this.findOneStockBalanceUseCase.findByBatchAndStockLocation(
            stockBalance.batch,
            binds.stockLocation,
          );
        this.stockBalanceDomainService.validateExistsStockBalanceUpdate(
          stockBalance,
          existingStockBalanceWithStockLocation,
        );
        stockBalance.changeStockLocation(binds.stockLocation);
      }
    }

    if (binds.quantity) {
      const currentQuantity = StockBalanceQuantity.create(
        stockBalance.quantity,
      );

      const result = this.stockBalanceDomainService.validateOperationType(
        dto.type,
        currentQuantity.getValue(),
        binds.quantity.getValue(),
      );

      stockBalance.changeQuantity(result);
    }

    await this.stockBalanceRepository.update(stockBalance.uuid, stockBalance);
  }
}
