import { UUID } from 'crypto';
import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';

export interface UserPayload {
  id?: number;
  uuid: UUID;
  name: string;
  email: string;
  role?: RoleEnum;
  status: StatusEnum;
}
