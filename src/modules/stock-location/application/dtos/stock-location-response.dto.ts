import { Expose, Transform } from 'class-transformer';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class StockLocationResponseDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isCentralStock: boolean;

  @Expose()
  status: StatusEnum;

  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  @Transform(({ obj }) => obj.userUpdated?.name || null)
  userUpdated: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
