import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';

import { EntryTypeEnum } from '../../domain/enums/entry-type.enum';

export class InventoryEntryCreateDto {
  @IsString({ message: 'A nota fiscal deve ser uma string' })
  @IsOptional()
  @MinLength(3, { message: 'A nota fiscal deve ter no mínimo 3 caracteres' })
  @MaxLength(70, { message: 'A nota fiscal deve ter no máximo 70 caracteres' })
  invoiceNumber?: string | null;

  @IsDate({ message: 'A data de entrada deve ser uma data' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de entrada é obrigatória' })
  entryDate: Date;

  @IsEnum(EntryTypeEnum, { message: 'O tipo de entrada deve ser um enum' })
  @IsNotEmpty({ message: 'O tipo de entrada é obrigatório' })
  entryType: EntryTypeEnum;

  @IsUUID('4', { message: 'O local de estoque deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O local de estoque é obrigatório' })
  stockLocation: UUID;

  @IsNumber(
    { maxDecimalPlaces: 2 },
    { message: 'O valor total deve ser um número' },
  )
  @IsOptional()
  totalValue?: number | null;
}
