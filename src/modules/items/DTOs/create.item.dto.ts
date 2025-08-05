import {
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { DosageEnum } from 'src/common/enums/dosage.enum';
import { PresentationEnum } from 'src/common/enums/presentation.enum';
import { SubtypeEnum } from 'src/common/enums/subtype.enum';
import { TypeEnum } from 'src/common/enums/type.enum';

export class CreateItemDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O tipo é obrigatório' })
  @IsIn(Object.keys(TypeEnum), {
    message: `O tipo deve ser um dos seguintes valores: ${Object.keys(TypeEnum).join(', ')}.`,
  })
  type: TypeEnum;

  @IsNotEmpty({ message: 'A apresentação é obrigatória' })
  @IsIn(Object.keys(PresentationEnum), {
    message: `A apresentação deve ser um dos seguintes valores: ${Object.keys(PresentationEnum).join(', ')}.`,
  })
  presentation: PresentationEnum;

  @IsNotEmpty({ message: 'A dosagem é obrigatória' })
  @IsIn(Object.keys(DosageEnum), {
    message: `A dosagem deve ser um dos seguintes valores: ${Object.keys(DosageEnum).join(', ')}.`,
  })
  dosage: DosageEnum;

  @ValidateIf((o) => o.type === 'M')
  @IsNotEmpty({
    message: 'O subtipo é obrigatório quando o tipo for medicamento',
  })
  @IsIn(Object.keys(SubtypeEnum), {
    message: `O subtipo deve ser um dos seguintes valores: ${Object.keys(SubtypeEnum).join(', ')}.`,
  })
  subtype?: SubtypeEnum;
}
