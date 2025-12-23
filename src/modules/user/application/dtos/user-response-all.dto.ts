import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { RoleEnumTranslated } from 'src/shared/enums/role.enum';
import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class UserResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ obj }) => {
    return {
      value: obj.role.name,
      label:
        RoleEnumTranslated[obj.role.name as keyof typeof RoleEnumTranslated] ||
        obj.role.name,
    };
  })
  role: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated] ||
      obj.status,
  }))
  status: { value: string; label: string };
}
