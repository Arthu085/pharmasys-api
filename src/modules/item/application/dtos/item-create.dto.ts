import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { TypeEnum } from '../../domain/enums/type.enum';
import { PresentationEnum } from '../../domain/enums/presentation.enum';
import { DosageEnum } from '../../domain/enums/dosage.enum';
import { SubtypeEnum } from '../../domain/enums/subtype.enum';

export class ItemCreateDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsEnum(TypeEnum, {
    message: 'O tipo deve ser um enum',
  })
  type: TypeEnum;

  @IsNotEmpty({ message: 'A apresentação é obrigatória' })
  @IsEnum(PresentationEnum, {
    message: 'A apresentação deve ser um enum',
  })
  presentation: PresentationEnum;

  @IsNotEmpty({ message: 'A dosagem é obrigatória' })
  @IsEnum(DosageEnum, {
    message: 'A dosagem deve ser um enum',
  })
  dosage: DosageEnum;

  @ValidateIf((o) => o.type === 'MEDICAMENTO')
  @IsNotEmpty({
    message: 'O subtipo é obrigatório quando o tipo for medicamento',
  })
  @IsEnum(SubtypeEnum, {
    message: 'O subtipo deve ser um enum',
  })
  subtype?: SubtypeEnum;
}
