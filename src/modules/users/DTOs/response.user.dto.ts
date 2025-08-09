import { Role } from '../entities/role.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: string;
  created_at: Date;
  updated_at: Date;
}
