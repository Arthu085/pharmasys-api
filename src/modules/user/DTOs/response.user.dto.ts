import { StatusEnum } from 'src/shared/enums/status.enum';
import { RoleEntity } from '../entities/role.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  role: RoleEntity;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date | null;
  userUpdated: number | null;
}
