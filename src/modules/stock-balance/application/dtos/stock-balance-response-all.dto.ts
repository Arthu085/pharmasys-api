import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import {
  StockLocationEnum,
  StockLocationEnumTranslated,
} from 'src/modules/stock-location/domain/enums/stock-location.enum';

export class StockBalanceResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  @Transform(({ obj }) => {
    return obj.item
      ? {
          value: obj.item.uuid,
          label: obj.item.name,
        }
      : null;
  })
  item: { value: UUID; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.batch
      ? {
          value: obj.batch.uuid,
          label: obj.batch.batchCode,
        }
      : null;
  })
  batch: { value: UUID; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.stockLocation
      ? {
          value: obj.stockLocation.uuid,
          label:
            StockLocationEnumTranslated[
              obj.stockLocation.name as keyof typeof StockLocationEnumTranslated
            ] || obj.stockLocation.name,
        }
      : null;
  })
  stockLocation: { value: UUID; label: string } | null;

  @Expose()
  quantity: number;
}
