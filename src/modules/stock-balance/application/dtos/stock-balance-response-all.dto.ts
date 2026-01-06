import { Expose, Transform } from 'class-transformer';
import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';

export class StockBalanceResponseAllDto {
  @Expose()
  @Transform(({ obj }) => {
    return obj.item
      ? {
          label: obj.item.name,
        }
      : null;
  })
  item: { label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.batch
      ? {
          label: obj.batch.batchCode,
        }
      : null;
  })
  batch: { label: string } | null;

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
  quantity: number;
}
