import { Expose, Transform } from 'class-transformer';
import { TransferRequestResponseAllDto } from './transfer-request-response-all.dto';

export class TransferRequestResponseOneDto extends TransferRequestResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  @Transform(({ obj }) => obj.userUpdated?.name || null)
  userUpdated: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
