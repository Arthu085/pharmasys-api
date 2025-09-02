import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/DTOs/filter.dto';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class FilterStockLocationDto extends FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  code?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;
}
