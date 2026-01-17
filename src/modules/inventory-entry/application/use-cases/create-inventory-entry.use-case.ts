import { Inject, Injectable } from '@nestjs/common';

import { DataSourceProvider } from 'src/core/database/providers/data-source.provider';
import { IInventoryEntryRepository } from '../../domain/repositories/inventory-entry.repository.interface';
import { InventoryEntryCreateDto } from '../dtos/inventory-entry-create.dto';
import { InventoryEntryItemCreateDto } from '../dtos/inventory-entry-item-create.dto';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { FindOneEntryItemTypeUseCase } from './find-one-entry-item-type.use-case';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { CreateInventoryEntryItemUseCase } from './create-inventory-entry-item.use-case';
import { InventoryEntryInvoiceNumber } from '../../domain/value-objects/inventory-entry-invoice-number.vo';
import { InventoryEntryEntryDate } from '../../domain/value-objects/inventory-entry-entry-date.vo';
import { InventoryEntryTotalValue } from '../../domain/value-objects/inventory-entry-total-value.vo';
import { InventoryEntryDomainService } from '../../domain/services/inventory-entry-domain.service';

@Injectable()
export class CreateInventoryEntryUseCase {
  constructor(
    @Inject(IInventoryEntryRepository)
    private readonly inventoryEntryRepository: IInventoryEntryRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findOneEntryItemTypeUseCase: FindOneEntryItemTypeUseCase,
    private readonly createInventoryEntryItemUseCase: CreateInventoryEntryItemUseCase,
    private readonly inventoryEntryDomainService: InventoryEntryDomainService,
    private readonly dataSourceProvider: DataSourceProvider,
  ) {}

  async execute(
    dto: InventoryEntryCreateDto,
    dtoItems: InventoryEntryItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSourceProvider
      .getDataSource()
      .transaction(async (entityManager) => {
        const binds = {
          userCreated: await this.findOneUserUseCase.findById(userId),
          invoiceNumber: dto.invoiceNumber
            ? InventoryEntryInvoiceNumber.create(dto.invoiceNumber)
            : null,
          entryDate: InventoryEntryEntryDate.create(dto.entryDate),
          entryType: await this.findOneEntryItemTypeUseCase.findByName(
            dto.entryType,
          ),
          stockLocation:
            await this.findOneStockLocationUseCase.findEntityByUuid(
              dto.stockLocation,
            ),
          totalValue: dto.totalValue
            ? InventoryEntryTotalValue.create(dto.totalValue)
            : null,
        };

        this.inventoryEntryDomainService.validateTypeAndInvoiceNumber(
          binds.entryType,
          binds.invoiceNumber?.getValue() || null,
        );

        const inventoryEntryEntity = await this.inventoryEntryRepository.create(
          {
            ...binds,
            invoiceNumber: binds.invoiceNumber?.getValue() || null,
            entryDate: binds.entryDate.getValue(),
            totalValue: binds.totalValue?.getValue() || null,
          },
          entityManager,
        );

        for (const dtoItem of dtoItems) {
          await this.createInventoryEntryItemUseCase.execute(
            dtoItem,
            inventoryEntryEntity,
            entityManager,
          );
        }
      });
  }
}
