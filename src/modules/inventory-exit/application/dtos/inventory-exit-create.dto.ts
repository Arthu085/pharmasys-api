import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UUID } from 'crypto';
import { ExitTypeEnum } from '../../domain/enums/exit-type.enum';

export class InventoryExitCreateDto {
  @IsDate({ message: 'A data de saída deve ser uma data' })
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de saída é obrigatória' })
  exitDate: Date;

  @IsEnum(ExitTypeEnum, { message: 'O tipo de saída deve ser um enum' })
  @IsNotEmpty({ message: 'O tipo de saída é obrigatório' })
  exitType: ExitTypeEnum;

  @IsUUID('4', { message: 'O local de estoque deve ser um UUID válido' })
  @IsNotEmpty({ message: 'O local de estoque é obrigatório' })
  stockLocation: UUID;

  @IsString({ message: 'As anotações devem ser uma string' })
  @IsNotEmpty({ message: 'As anotações são obrigatórias' })
  @MinLength(3, { message: 'As anotações devem ter no mínimo 3 caracteres' })
  @MaxLength(500, {
    message: 'As anotações devem ter no máximo 500 caracteres',
  })
  notes: string;
}
