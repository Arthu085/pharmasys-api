import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';
import { Role } from '../entities/role.entity';

export class ResponseUserDto {
  id: number;
  name: string;
  email: string;
  role: Role;
  userStatus: GlobalStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  userUpdated: number;
}
