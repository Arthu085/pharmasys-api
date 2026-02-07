import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ItemDispensationCreateDto } from './item-dispensation-create.dto';
import { ItemDispensationItemCreateDto } from './item-dispensation-item-create.dto';
import { UniqueCompositeArray } from 'src/shared/validation/unique-composite-array.decorator';

export class CreateItemDispensationRequestDto {
  @ValidateNested()
  @Type(() => ItemDispensationCreateDto)
  dispensation: ItemDispensationCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @UniqueCompositeArray(['item', 'batch'], {
    message: 'Não é permitido repetir o mesmo item com o mesmo lote',
  })
  @Type(() => ItemDispensationItemCreateDto)
  items: ItemDispensationItemCreateDto[];
}
