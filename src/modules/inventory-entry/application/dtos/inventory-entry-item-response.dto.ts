import { Expose, Transform } from 'class-transformer';

export class InventoryEntryItemResponseDto {
  @Expose()
  quantity: number;

  @Expose()
  unitPrice: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.item
      ? {
          label: obj.item.name,
        }
      : null,
  )
  item: { label: string } | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.batch
      ? {
          label: obj.batch.batchCode,
        }
      : null,
  )
  batch: { label: string } | null;
}
