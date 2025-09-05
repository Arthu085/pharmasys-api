import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';

export class CreateItemDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsEnum(Object.keys(TypeEnum), {
    message: 'O tipo deve ser um enum',
  })
  type: TypeEnum;

  @IsNotEmpty({ message: 'A apresentação é obrigatória' })
  @IsEnum(Object.keys(PresentationEnum), {
    message: 'A apresentação deve ser um enum',
  })
  presentation: PresentationEnum;

  @IsNotEmpty({ message: 'A dosagem é obrigatória' })
  @IsEnum(Object.keys(DosageEnum), {
    message: 'A dosagem deve ser um enum',
  })
  dosage: DosageEnum;

  @ValidateIf((o) => o.type === 'MEDICAMENTO')
  @IsNotEmpty({
    message: 'O subtipo é obrigatório quando o tipo for medicamento',
  })
  @IsEnum(Object.keys(SubtypeEnum), {
    message: 'O subtipo deve ser um enum',
  })
  subtype?: SubtypeEnum;
}
