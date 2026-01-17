import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { InventoryExitCreateDto } from './inventory-exit-create.dto';
import { InventoryExitItemCreateDto } from './inventory-exit-item-create.dto';

export class CreateInventoryExitRequestDto {
  @ValidateNested()
  @Type(() => InventoryExitCreateDto)
  exit: InventoryExitCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryExitItemCreateDto)
  items: InventoryExitItemCreateDto[];
}
