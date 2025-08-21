import { ResponseUserDto } from '../DTOs/response.user.dto';
import { User } from '../entities/user.entity';

export function toResponseUserDto(user: User): ResponseUserDto {
  const responseDto = new ResponseUserDto();

  responseDto.id = user.id;
  responseDto.name = user.name;
  responseDto.email = user.email;
  responseDto.role = user.role;
  responseDto.userStatus = user.userStatus;
  responseDto.createdAt = user.createdAt;
  responseDto.updatedAt = user.updatedAt;
  responseDto.userUpdated = user.userUpdated;

  return responseDto;
}
