import { toResponseUserDto } from 'src/modules/user/mappers/user.mapper';
import { Item } from '../entities/item.entity';
import { ResponseItemDto } from '../DTOs/response.item.dto';

export function toResponseItemDto(item: Item): ResponseItemDto {
  const responseDto = new ResponseItemDto();

  responseDto.id = item.id;
  responseDto.name = item.name;
  responseDto.type = item.type;
  responseDto.presentation = item.presentation;
  responseDto.dosage = item.dosage;
  responseDto.subtype = item.subtype;
  responseDto.itemStatus = item.itemStatus;
  responseDto.createdAt = item.createdAt;
  responseDto.updatedAt = item.updatedAt;
  responseDto.userCreated = toResponseUserDto(item.userCreated);
  responseDto.userUpdated = item.userUpdated
    ? toResponseUserDto(item.userUpdated)
    : null;

  return responseDto;
}
