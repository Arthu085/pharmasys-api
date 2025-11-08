import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEnum } from '../enums/advice.enum';
import { UfEnum } from '../enums/uf.enum';

export class FilterPrescriptorDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O número de registro deve ser uma string' })
  registrationNumber?: string;

  @IsOptional()
  @IsEnum(Object.keys(AdviceEnum), { message: 'O conselho deve ser um enum' })
  advice?: AdviceEnum;

  @IsOptional()
  @IsEnum(Object.keys(UfEnum), { message: 'O estado deve ser um enum' })
  state?: UfEnum;

  @IsOptional()
  @IsEnum(Object.keys(StatusEnum), { message: 'O status deve ser um enum' })
  status?: StatusEnum;
}
