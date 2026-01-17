import { Expose, Transform } from 'class-transformer';

export class ItemDispensationItemResponseDto {
  @Expose()
  quantity: number;

  @Expose()
  isPsychotropic: boolean;

  @Expose()
  prescriptionNotificationNumber: string | null;

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
