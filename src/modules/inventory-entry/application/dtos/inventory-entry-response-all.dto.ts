import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { EntryTypeEnumTranslated } from '../../domain/enums/entry-type.enum';
import { InventoryEntryItemResponseDto } from './inventory-entry-item-response.dto';
import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';

export class InventoryEntryResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  invoiceNumber: string | null;

  @Expose()
  entryDate: Date;

  @Expose()
  totalValue: number | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.entryType
      ? {
          value: obj.entryType.name,
          label:
            EntryTypeEnumTranslated[
              obj.entryType.name as keyof typeof EntryTypeEnumTranslated
            ],
        }
      : null,
  )
  entryType: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.stockLocation
      ? {
          label:
            StockLocationEnumTranslated[
              obj.stockLocation.name as keyof typeof StockLocationEnumTranslated
            ] || obj.stockLocation.name,
        }
      : null;
  })
  stockLocation: { label: string } | null;

  @Expose()
  @Type(() => InventoryEntryItemResponseDto)
  items: InventoryEntryItemResponseDto[];
}
