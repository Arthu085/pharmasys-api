import { User } from '../entities/user.entity';
import { ResponseUserDto } from '../DTOs/response.user.dto';

export function toResponseUserDto(user: User): ResponseUserDto {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };
}
