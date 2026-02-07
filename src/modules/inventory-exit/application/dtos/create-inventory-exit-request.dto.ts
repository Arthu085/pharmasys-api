import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { InventoryExitCreateDto } from './inventory-exit-create.dto';
import { InventoryExitItemCreateDto } from './inventory-exit-item-create.dto';
import { UniqueCompositeArray } from 'src/shared/validation/unique-composite-array.decorator';

export class CreateInventoryExitRequestDto {
  @ValidateNested()
  @Type(() => InventoryExitCreateDto)
  exit: InventoryExitCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @UniqueCompositeArray(['item', 'batch'], {
    message: 'Não é permitido repetir o mesmo item com o mesmo lote',
  })
  @Type(() => InventoryExitItemCreateDto)
  items: InventoryExitItemCreateDto[];
}
