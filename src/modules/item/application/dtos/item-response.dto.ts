import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { TypeEnum, TypeEnumTranslated } from '../../domain/enums/type.enum';
import {
  PresentationEnum,
  PresentationEnumTranslated,
} from '../../domain/enums/presentation.enum';
import {
  DosageEnum,
  DosageEnumTranslated,
} from '../../domain/enums/dosage.enum';
import {
  SubtypeEnum,
  SubtypeEnumTranslated,
} from '../../domain/enums/subtype.enum';

export class ItemResponseDto {
  @Expose()
  uuid: UUID;

  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.type?.name,
    label: TypeEnumTranslated[obj.type?.name as TypeEnum] || obj.type?.name,
  }))
  type: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.presentation?.name,
    label:
      PresentationEnumTranslated[obj.presentation?.name as PresentationEnum] ||
      obj.presentation?.name,
  }))
  presentation: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.dosage?.format,
    label:
      DosageEnumTranslated[obj.dosage?.format as DosageEnum] ||
      obj.dosage?.format,
  }))
  dosage: { value: string; label: string };

  @Expose()
  @Transform(({ obj }) =>
    obj.subtype
      ? {
          value: obj.subtype.name,
          label:
            SubtypeEnumTranslated[obj.subtype.name as SubtypeEnum] ||
            obj.subtype.name,
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
