import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StockLocationEnumTranslated } from 'src/modules/stock-location/domain/enums/stock-location.enum';
import { StockTransferItemResponseDto } from './stock-transfer-item-response.dto';

export class StockTransferResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  transferDate: Date;

  @Expose()
  @Transform(({ obj }) => {
    return obj.origin
      ? {
          label:
            StockLocationEnumTranslated[
              obj.origin.name as keyof typeof StockLocationEnumTranslated
            ] || obj.origin.name,
        }
      : null;
  })
  origin: { label: string } | null;

  @Expose()
  @Transform(({ obj }) => {
    return obj.destination
      ? {
          label:
            StockLocationEnumTranslated[
              obj.destination.name as keyof typeof StockLocationEnumTranslated
            ] || obj.destination.name,
        }
      : null;
  })
  destination: { label: string } | null;

  @Expose()
  @Type(() => StockTransferItemResponseDto)
  items: StockTransferItemResponseDto[];
}
