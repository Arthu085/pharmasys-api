import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

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
          label: obj.stockLocation.name,
        }
      : null;
  })
  stockLocation: { value: UUID; label: string } | null;

  @Expose()
  quantity: number;
}
