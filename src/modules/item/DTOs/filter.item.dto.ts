import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
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
  @IsIn(Object.keys(TypeEnum))
  type?: TypeEnum;

  @IsOptional()
  @IsIn(Object.keys(PresentationEnum))
  presentation?: PresentationEnum;

  @IsOptional()
  @IsIn(Object.keys(DosageEnum))
  dosage?: DosageEnum;

  @IsOptional()
  @IsIn(Object.keys(SubtypeEnum))
  subtype?: SubtypeEnum;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
