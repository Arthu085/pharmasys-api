import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { FilterDto } from 'src/shared/dtos/filter.dto';

export class ItemDispensationFilterDto extends FilterDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de dispensação deve ser uma data válida' })
  dispensationDate?: Date;

  @IsOptional()
  @IsUUID('4', { message: 'Paciente deve ser um UUID válido' })
  patient?: UUID;

  @IsOptional()
  @IsUUID('4', { message: 'Prescritor deve ser um UUID válido' })
  prescriptor?: UUID;

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
