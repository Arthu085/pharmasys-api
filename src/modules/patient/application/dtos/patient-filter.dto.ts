import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class PatientFilterDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O documento deve ser uma string' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  document?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: 'O status deve ser um enum' })
  status?: StatusEnum;
}
