import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';
import { ItemDispensationItemResponseDto } from './item-dispensation-item-response.dto';

export class ItemDispensationResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  dispensationDate: Date;

  @Expose()
  @Transform(({ obj }) =>
    obj.patient
      ? {
          label: obj.patient.name,
        }
      : null,
  )
  patient: { label: string } | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.prescriptor
      ? {
          label: obj.prescriptor.name,
        }
      : null,
  )
  prescriptor: { label: string } | null;

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
  @Type(() => ItemDispensationItemResponseDto)
  items: ItemDispensationItemResponseDto[];
}
