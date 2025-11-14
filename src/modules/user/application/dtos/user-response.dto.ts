import { Expose, Transform } from 'class-transformer';

import { RoleEnum, RoleEnumTranslated } from 'src/shared/enums/role.enum';
import { StatusEnum, StatusEnumTranslated } from 'src/shared/enums/status.enum';

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
  @Transform(({ obj }) => ({
    value: obj.role?.name,
    label: RoleEnumTranslated[obj.role?.name as RoleEnum] || obj.role?.name,
  }))
  role: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

  @Expose()
  @Transform(({ obj }) => obj.userUpdated?.name || null)
  userUpdated: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
