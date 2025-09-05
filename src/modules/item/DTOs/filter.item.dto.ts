import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/DTOs/filter.dto';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class FilterItemDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsEnum(Object.keys(TypeEnum), { message: 'O tipo deve ser um enum' })
  type?: TypeEnum;

  @IsOptional()
  @IsEnum(Object.keys(PresentationEnum), {
    message: 'A apresentação deve ser um enum',
  })
  presentation?: PresentationEnum;

  @IsOptional()
  @IsEnum(Object.keys(DosageEnum), { message: 'A dosagem deve ser um enum' })
  dosage?: DosageEnum;

  @IsOptional()
  @IsEnum(Object.keys(SubtypeEnum), { message: 'O subtipo deve ser um enum' })
  subtype?: SubtypeEnum;

  @IsOptional()
  @IsEnum(Object.keys(StatusEnum), { message: 'O status deve ser um enum' })
  status?: StatusEnum;
}
