import { User } from '../entities/user.entity';
import { ResponseUserDto } from '../DTOs/response.user.dto';

export function toResponseUserDto(user: User): ResponseUserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    userStatus: user.userStatus,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    userUpdated: user.userUpdated,
  };
}
