import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { AdviceEnumTranslated } from '../../domain/enums/advice.enum';
import { UfEnumTranslated } from '../../domain/enums/uf.enum';

export class PrescriptorResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  registrationNumber: string;

  @Expose()
  @Transform(({ obj }) =>
    obj.state
      ? {
          value: obj.state,
          label: UfEnumTranslated[obj.state as keyof typeof UfEnumTranslated],
        }
      : null,
  )
  state: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) =>
    obj.advice
      ? {
          value: obj.advice.acronym,
          label:
            AdviceEnumTranslated[
              obj.advice.acronym as keyof typeof AdviceEnumTranslated
            ] || obj.advice.acronym,
        }
      : null,
  )
  advice: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
