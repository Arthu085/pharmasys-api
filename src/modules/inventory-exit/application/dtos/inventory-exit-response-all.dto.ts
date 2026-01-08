import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';
import { ExitTypeEnumTranslated } from '../../domain/enums/exit-type.enum';
import { InventoryExitItemResponseDto } from './inventory-exit-item-response.dto';

export class InventoryExitResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  exitDate: Date;

  @Expose()
  notes: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.exitType
      ? {
          value: obj.exitType.name,
          label:
            ExitTypeEnumTranslated[
              obj.exitType.name as keyof typeof ExitTypeEnumTranslated
            ],
        }
      : null,
  )
  exitType: { value: string; label: string } | null;

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
  @Type(() => InventoryExitItemResponseDto)
  items: InventoryExitItemResponseDto[];
}
