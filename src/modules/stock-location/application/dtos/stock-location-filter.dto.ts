import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/dtos/filter.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class StockLocationFilterDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O código deve ser uma string' })
  code?: string;

  @IsOptional()
  @IsEnum(Object.keys(StatusEnum), { message: 'O status deve ser um enum' })
  status?: StatusEnum;
}
