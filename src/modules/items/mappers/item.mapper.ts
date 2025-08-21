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
    itemStatus: item.itemStatus,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt ? item.updatedAt : undefined,
    userCreated: toResponseUserDto(item.userCreated),
    userUpdated: item.userUpdated
      ? toResponseUserDto(item.userUpdated)
      : undefined,
  };
}
