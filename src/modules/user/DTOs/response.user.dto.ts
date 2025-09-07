import { StatusEnum } from 'src/shared/enums/status.enum';
import { Role } from '../entities/role.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date | null;
  userUpdated: number | null;
}
