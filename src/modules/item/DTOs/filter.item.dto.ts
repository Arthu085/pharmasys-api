import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/DTOs/filter.dto';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class FilterItemDto extends FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(TypeEnum)
  type?: TypeEnum;

  @IsOptional()
  @IsEnum(PresentationEnum)
  presentation?: PresentationEnum;

  @IsOptional()
  @IsEnum(DosageEnum)
  dosage?: DosageEnum;

  @IsOptional()
  @IsEnum(SubtypeEnum)
  subtype?: SubtypeEnum;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
