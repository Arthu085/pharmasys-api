import { Inject, Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { IStockTransferRepository } from '../../domain/repositories/stock-transfer.repository.interface';
import { CreateStockTransferItemUseCase } from './create-stock-transfer-item.use-case';
import { StockTransferCreateDto } from '../dtos/stock-transfer-create.dto';
import { StockTransferItemCreateDto } from '../dtos/stock-transfer-item-create.dto';
import { StockTransferDate } from '../../domain/value-objects/stock-transfer-date.vo';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

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
    user?: UserEntity | null,
    entityManager?: EntityManager,
  ): Promise<void> {
    const executeTransaction = async (manager: EntityManager) => {
      const binds = {
        transferDate: StockTransferDate.create(dto.transferDate),
        origin: await this.findOneStockLocationUseCase.findEntityByUuid(
          dto.origin,
        ),
        destination: await this.findOneStockLocationUseCase.findEntityByUuid(
          dto.destination,
        ),
      };

      const userCreating: UserEntity =
        user || (await this.findOneUserUseCase.findById(userId));

      const stockTransferEntity = await this.stockTransferRepository.create(
        {
          transferDate: binds.transferDate.getValue(),
          origin: binds.origin,
          destination: binds.destination,
          userCreated: userCreating,
        },
        manager,
      );

      for (const dtoItem of dtoItems) {
        await this.createStockTransferItemUseCase.execute(
          dtoItem,
          stockTransferEntity,
          manager,
        );
      }
    };

    if (entityManager) {
      await executeTransaction(entityManager);
    } else {
      await this.dataSource.transaction(executeTransaction);
    }
  }
}
