import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class BatchResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  batchCode: string;

  @Expose()
  @Transform(({ obj }) => {
    return obj.company
      ? {
          value: obj.company.uuid,
          label: obj.company.name,
        }
      : null;
  })
  company: { value: UUID; label: string } | null;

  @Expose()
  expirationDate: Date;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
