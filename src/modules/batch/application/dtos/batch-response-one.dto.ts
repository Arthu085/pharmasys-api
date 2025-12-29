import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class BatchResponseOneDto {
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
