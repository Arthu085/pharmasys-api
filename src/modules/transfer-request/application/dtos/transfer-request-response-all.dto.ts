import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';
import { TransferReasonEnumTranslated } from '../../domain/enums/transfer-reason.enum';
import { TransferStatusEnumTranslated } from '../../domain/enums/transfer-status.enum';
import { TransferRequestItemResponseDto } from './transfer-request-item-response.dto';

export class TransferRequestResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  requestDate: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.origin
      ? {
          value: obj.origin.uuid,
          label:
            StockLocationEnumTranslated[
              obj.origin.name as keyof typeof StockLocationEnumTranslated
            ] || obj.origin.name,
        }
      : null;
  })
  origin: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.destination
      ? {
          value: obj.destination.uuid,
          label:
            StockLocationEnumTranslated[
              obj.destination.name as keyof typeof StockLocationEnumTranslated
            ] || obj.destination.name,
        }
      : null;
  })
  destination: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.reason
      ? {
          value: obj.reason.name,
          label:
            TransferReasonEnumTranslated[
              obj.reason.name as keyof typeof TransferReasonEnumTranslated
            ] || obj.reason.name,
        }
      : null;
  })
  reason: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.statusTransfer
      ? {
          value: obj.statusTransfer,
          label:
            TransferStatusEnumTranslated[
              obj.statusTransfer as keyof typeof TransferStatusEnumTranslated
            ] || obj.statusTransfer,
        }
      : null;
  })
  statusTransfer: { value: string; label: string } | null;

  @Expose()
  @Type(() => TransferRequestItemResponseDto)
  items: TransferRequestItemResponseDto[];
}
