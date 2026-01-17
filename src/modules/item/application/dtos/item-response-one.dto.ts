import { Expose, Transform } from 'class-transformer';

import { ItemResponseAllDto } from './item-response-all.dto';

export class ItemResponseOneDto extends ItemResponseAllDto {
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
