import { Expose, Transform } from 'class-transformer';
import { TransferStatusItemEnumTranslated } from '../../domain/enums/transfer-status-item.enum';
import { UUID } from 'crypto';

export class TransferRequestItemResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  quantity: number;

  @Expose()
  @Transform(({ obj }) =>
    obj.statusTransferItem
      ? {
          value: obj.statusTransferItem,
          label:
            TransferStatusItemEnumTranslated[
              obj.statusTransferItem as keyof typeof TransferStatusItemEnumTranslated
            ] || obj.statusTransferItem,
        }
      : null,
  )
  statusTransferItem: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.item
      ? {
          value: obj.item.uuid,
          label: obj.item.name,
        }
      : null,
  )
  item: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.batch
      ? {
          value: obj.batch.uuid,
          label: obj.batch.batchCode,
        }
      : null,
  )
  batch: { value: string; label: string } | null;
}
