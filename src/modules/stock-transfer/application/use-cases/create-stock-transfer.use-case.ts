import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { IStockTransferRepository } from '../../domain/repositories/stock-transfer.repository.interface';
import { CreateStockTransferItemUseCase } from './create-stock-transfer-item.use-case';
import { StockTransferCreateDto } from '../dtos/stock-transfer-create.dto';
import { StockTransferItemCreateDto } from '../dtos/stock-transfer-item-create.dto';
import { StockTransferDate } from '../../domain/value-objects/stock-transfer-date.vo';

@Injectable()
export class CreateStockTransferUseCase {
  constructor(
    @Inject(IStockTransferRepository)
    private readonly stockTransferRepository: IStockTransferRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly createStockTransferItemUseCase: CreateStockTransferItemUseCase,
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    dto: StockTransferCreateDto,
    dtoItems: StockTransferItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      const binds = {
        transferDate: StockTransferDate.create(dto.transferDate),
        origin: await this.findOneStockLocationUseCase.findEntityByUuid(
          dto.origin,
        ),
        destination: await this.findOneStockLocationUseCase.findEntityByUuid(
          dto.destination,
        ),
      };

      const userCreating = await this.findOneUserUseCase.findById(userId);

      const stockTransferEntity = await this.stockTransferRepository.create(
        {
          transferDate: binds.transferDate.getValue(),
          origin: binds.origin,
          destination: binds.destination,
          userCreated: userCreating,
        },
        entityManager,
      );

      for (const dtoItem of dtoItems) {
        await this.createStockTransferItemUseCase.execute(
          dtoItem,
          stockTransferEntity,
          entityManager,
        );
      }
    });
  }
}
