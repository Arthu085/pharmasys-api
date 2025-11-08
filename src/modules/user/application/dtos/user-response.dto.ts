import { Expose, Transform } from 'class-transformer';

import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  uuid: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => obj.role?.name)
  role: RoleEnum;

  @Expose()
  status: StatusEnum;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
