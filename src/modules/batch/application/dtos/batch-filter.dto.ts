import { IsDate, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { UUID } from 'crypto';
import { Type } from 'class-transformer';

export class BatchFilterDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O código do lote deve ser uma string' })
  batchCode?: string;

  @IsOptional()
  @IsUUID('4', { message: 'Empresa deve ser um UUID válido' })
  company?: UUID;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data de expiração deve ser uma data válida' })
  expirationDate?: Date;

  @IsOptional()
  @IsEnum(StatusEnum, { message: 'O status deve ser um enum' })
  status?: StatusEnum;
}
