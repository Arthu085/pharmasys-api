import { Expose, Transform } from 'class-transformer';

import { ItemDispensationResponseAllDto } from './item-dispensation-response-all.dto';

export class ItemDispensationResponseOneDto extends ItemDispensationResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  createdAt: Date;
}
