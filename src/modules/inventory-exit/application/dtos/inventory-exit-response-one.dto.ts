import { Expose, Transform } from 'class-transformer';
import { InventoryExitResponseAllDto } from './inventory-exit-response-all.dto';

export class InventoryExitResponseOneDto extends InventoryExitResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  createdAt: Date;
}
