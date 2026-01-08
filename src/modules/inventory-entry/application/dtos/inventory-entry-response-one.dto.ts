import { Expose, Transform } from 'class-transformer';

import { InventoryEntryResponseAllDto } from './inventory-entry-response-all.dto';

export class InventoryEntryResponseOneDto extends InventoryEntryResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  createdAt: Date;
}
