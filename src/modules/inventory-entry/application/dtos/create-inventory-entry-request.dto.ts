import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { InventoryEntryCreateDto } from './inventory-entry-create.dto';
import { InventoryEntryItemCreateDto } from './inventory-entry-item-create.dto';

export class CreateInventoryEntryRequestDto {
  @ValidateNested()
  @Type(() => InventoryEntryCreateDto)
  entry: InventoryEntryCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => InventoryEntryItemCreateDto)
  items: InventoryEntryItemCreateDto[];
}
