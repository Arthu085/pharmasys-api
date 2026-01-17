import { Type } from 'class-transformer';
import { IsDate, IsEnum, IsNumber, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { FilterDto } from 'src/shared/dtos/filter.dto';
import { ExitTypeEnum } from '../../domain/enums/exit-type.enum';

export class InventoryExitFilterDto extends FilterDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de saída deve ser uma data válida' })
  exitDate?: Date;

  @IsOptional()
  @IsEnum(ExitTypeEnum, { message: 'Tipo de saída deve ser um enum' })
  exitType?: ExitTypeEnum;

  @IsOptional()
  @IsUUID('4', { message: 'Local de estoque deve ser um UUID válido' })
  stockLocation?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Item deve ser um UUID válido' })
  item?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Lote deve ser um UUID válido' })
  batch?: UUID;
}
