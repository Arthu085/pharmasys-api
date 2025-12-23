import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { TypeEnumTranslated } from '../../domain/enums/type.enum';
import { PresentationEnumTranslated } from '../../domain/enums/presentation.enum';
import { DosageEnumTranslated } from '../../domain/enums/dosage.enum';
import { SubtypeEnumTranslated } from '../../domain/enums/subtype.enum';

export class ItemResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.type.name,
    label:
      TypeEnumTranslated[obj.type.name as keyof typeof TypeEnumTranslated] ||
      obj.type.name,
  }))
  type: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.presentation.name,
    label:
      PresentationEnumTranslated[
        obj.presentation.name as keyof typeof PresentationEnumTranslated
      ] || obj.presentation.name,
  }))
  presentation: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.dosage.format,
    label:
      DosageEnumTranslated[
        obj.dosage.format as keyof typeof DosageEnumTranslated
      ] || obj.dosage.format,
  }))
  dosage: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) =>
    obj.subtype
      ? {
          value: obj.subtype.name,
          label:
            SubtypeEnumTranslated[
              obj.subtype.name as keyof typeof SubtypeEnumTranslated
            ] || obj.subtype.name,
        }
      : null,
  )
  subtype: { value: string; label: string } | null;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
