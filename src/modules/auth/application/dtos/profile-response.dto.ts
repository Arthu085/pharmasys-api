import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';
import { RoleEnumTranslated } from 'src/shared/enums/role.enum';

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
}
