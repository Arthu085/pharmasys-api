import { ResponseItemDto } from '../DTOs/response.item.dto';
import { Item } from '../entities/item.entity';
import { toResponseUserDto } from 'src/modules/users/mappers/user.mapper';

export function toResponseItemDto(item: Item): ResponseItemDto {
  return {
    id: item.id,
    name: item.name,
    type: item.type,
    presentation: item.presentation,
    dosage: item.dosage,
    subtype: item.subtype,
    user: toResponseUserDto(item.user),
    user_id: item.user_id,
  };
}
