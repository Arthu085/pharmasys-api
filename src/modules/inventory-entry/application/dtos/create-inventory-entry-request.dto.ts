import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { InventoryEntryCreateDto } from './inventory-entry-create.dto';
import { InventoryEntryItemCreateDto } from './inventory-entry-item-create.dto';
import { UniqueCompositeArray } from 'src/shared/validation/unique-composite-array.decorator';

export class CreateInventoryEntryRequestDto {
  @ValidateNested()
  @Type(() => InventoryEntryCreateDto)
  entry: InventoryEntryCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @UniqueCompositeArray(['item', 'batch'], {
    message: 'Não é permitido repetir o mesmo item com o mesmo lote',
  })
  @Type(() => InventoryEntryItemCreateDto)
  items: InventoryEntryItemCreateDto[];
}
