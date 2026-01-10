import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { ItemDispensationCreateDto } from './item-dispensation-create.dto';
import { ItemDispensationItemCreateDto } from './item-dispensation-item-create.dto';

export class CreateItemDispensationRequestDto {
  @ValidateNested()
  @Type(() => ItemDispensationCreateDto)
  dispensation: ItemDispensationCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ItemDispensationItemCreateDto)
  items: ItemDispensationItemCreateDto[];
}
