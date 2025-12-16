import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import {
  AdviceEnum,
  AdviceEnumTranslated,
} from '../../domain/enums/advice.enum';
import { UfEnumTranslated } from '../../domain/enums/uf.enum';

export class PrescriptorResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  registrationNumber: string;

  @Expose()
  speciality: string | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.state,
    label: UfEnumTranslated[obj.state as keyof typeof UfEnumTranslated],
  }))
  state: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.advice?.acronym,
    label:
      AdviceEnumTranslated[obj.advice?.acronym as AdviceEnum] ||
      obj.advice?.acronym,
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
  @Transform(({ obj }) => obj.userCreated.name)
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
