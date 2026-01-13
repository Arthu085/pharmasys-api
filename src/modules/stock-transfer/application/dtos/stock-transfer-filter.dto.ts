import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { FilterDto } from 'src/shared/dtos/filter.dto';

export class StockTransferFilterDto extends FilterDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de transferência deve ser uma data válida' })
  transferDate?: Date;

  @IsOptional()
  @IsUUID('4', { message: 'Origem deve ser um UUID válido' })
  origin?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Destino deve ser um UUID válido' })
  destination?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Item deve ser um UUID válido' })
  item?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Lote deve ser um UUID válido' })
  batch?: UUID;
}
