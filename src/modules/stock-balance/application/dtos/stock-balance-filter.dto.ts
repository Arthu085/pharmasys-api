import { IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import { FilterDto } from 'src/shared/dtos/filter.dto';

export class StockBalanceFilterDto extends FilterDto {
  @IsOptional()
  @IsUUID('4', { message: 'Item deve ser um UUID válido' })
  item?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Lote deve ser um UUID válido' })
  batch?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Local de estoque deve ser um UUID válido' })
  stockLocation?: UUID;
}
