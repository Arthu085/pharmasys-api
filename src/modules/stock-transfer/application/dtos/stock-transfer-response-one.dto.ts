import { Expose, Transform } from 'class-transformer';
import { StockTransferResponseAllDto } from './stock-transfer-response-all.dto';

export class StockTransferResponseOneDto extends StockTransferResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  createdAt: Date;
}
