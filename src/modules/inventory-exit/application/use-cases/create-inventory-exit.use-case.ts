import { Inject, Injectable } from '@nestjs/common';

import { DataSourceProvider } from 'src/core/database/providers/data-source.provider';
import { IInventoryExitRepository } from '../../domain/repositories/inventory-exit.repository.interface';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { FindOneExitItemTypeUseCase } from './find-one-entry-exit-type.use-case';
import { InventoryExitCreateDto } from '../dtos/inventory-exit-create.dto';
import { InventoryExitItemCreateDto } from '../dtos/inventory-exit-item-create.dto';
import { InventoryExitExitDate } from '../../domain/value-objects/inventory-exit-exit-date.vo';
import { InventoryExitNotes } from '../../domain/value-objects/inventory-exit-notes.vo';
import { CreateInventoryExitItemUseCase } from './create-inventory-exit-item.use-case';

@Injectable()
export class CreateInventoryExitUseCase {
  constructor(
    @Inject(IInventoryExitRepository)
    private readonly inventoryExitRepository: IInventoryExitRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findOneExitItemTypeUseCase: FindOneExitItemTypeUseCase,
    private readonly createInventoryExitItemUseCase: CreateInventoryExitItemUseCase,
    private readonly dataSourceProvider: DataSourceProvider,
  ) {}

  async execute(
    dto: InventoryExitCreateDto,
    dtoItems: InventoryExitItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSourceProvider
      .getDataSource()
      .transaction(async (entityManager) => {
        const binds = {
          userCreated: await this.findOneUserUseCase.findById(userId),
          exitDate: InventoryExitExitDate.create(dto.exitDate),
          exitType: await this.findOneExitItemTypeUseCase.findByName(
            dto.exitType,
          ),
          stockLocation:
            await this.findOneStockLocationUseCase.findEntityByUuid(
              dto.stockLocation,
            ),
          notes: InventoryExitNotes.create(dto.notes),
        };

        const inventoryExitEntity = await this.inventoryExitRepository.create(
          {
            ...binds,
            exitDate: binds.exitDate.getValue(),
            notes: binds.notes.getValue(),
          },
          entityManager,
        );

        for (const dtoItem of dtoItems) {
          await this.createInventoryExitItemUseCase.execute(
            dtoItem,
            inventoryExitEntity,
            dto.exitType,
            entityManager,
          );
        }
      });
  }
}
