import { ResponseUserDto } from '../DTOs/response.user.dto';
import { UserEntity } from '../entities/user.entity';

export function toResponseUserDto(user: UserEntity): ResponseUserDto {
  const responseDto = new ResponseUserDto();

  responseDto.id = user.id;
  responseDto.name = user.name;
  responseDto.email = user.email;
  responseDto.role = user.role;
  responseDto.status = user.status;
  responseDto.createdAt = user.createdAt;
  responseDto.updatedAt = user.updatedAt;
  responseDto.userUpdated = user.userUpdated;

  return responseDto;
}
