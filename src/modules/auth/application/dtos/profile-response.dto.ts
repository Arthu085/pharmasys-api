import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { RoleEnumTranslated } from 'src/shared/enums/role.enum';
import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class ProfileResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  @Transform(({ value }) =>
    value
      ? {
          value,
          label:
            RoleEnumTranslated[value as keyof typeof RoleEnumTranslated] ||
            value,
        }
      : null,
  )
  role: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
