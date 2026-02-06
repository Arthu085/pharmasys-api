import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { UUID } from 'crypto';

import { FilterDto } from 'src/shared/dtos/filter.dto';
import { EntryTypeEnum } from '../../domain/enums/entry-type.enum';

export class InventoryEntryFilterDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'Número da nota fiscal deve ser uma string' })
  invoiceNumber?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'Data de entrada deve ser uma data válida' })
  entryDate?: Date;

  @IsOptional()
  @IsEnum(EntryTypeEnum, { message: 'Tipo de entrada deve ser um enum' })
  entryType?: EntryTypeEnum;

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
