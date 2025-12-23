import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { AdviceEnumTranslated } from '../../domain/enums/advice.enum';
import { UfEnumTranslated } from '../../domain/enums/uf.enum';

export class PrescriptorResponseOneDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  registrationNumber: string;

  @Expose()
  specialty: string | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.state,
    label: UfEnumTranslated[obj.state as keyof typeof UfEnumTranslated],
  }))
  state: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.advice.acronym,
    label:
      AdviceEnumTranslated[
        obj.advice.acronym as keyof typeof AdviceEnumTranslated
      ] || obj.advice.acronym,
  }))
  advice: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name)
  userCreated: string;

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
