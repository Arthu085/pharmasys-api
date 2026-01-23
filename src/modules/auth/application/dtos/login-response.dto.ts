import { Expose, Transform } from 'class-transformer';
import { RoleEnumTranslated } from 'src/shared/enums/role.enum';
import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class LoginResponseDto {
  @Expose()
  token: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.role
      ? {
          value: obj.role.name,
          label:
            RoleEnumTranslated[
              obj.role.name as keyof typeof RoleEnumTranslated
            ] || obj.role.name,
        }
      : null;
  })
  role: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
