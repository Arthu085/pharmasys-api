import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UUID } from 'crypto';

export class BatchCreateDto {
  @IsNotEmpty({ message: 'O código é obrigatório' })
  @IsString({ message: 'O código deve ser uma string' })
  @MinLength(1, { message: 'O código deve ter no mínimo 1 caractere' })
  @MaxLength(20, { message: 'O código deve ter no máximo 20 caracteres' })
  batchCode: string;

  @IsNotEmpty({ message: 'Empresa é obrigatória' })
  @IsUUID('4', { message: 'Empresa deve ser um UUID válido' })
  company: UUID;

  @IsNotEmpty({ message: 'A data de expiração é obrigatória' })
  @Type(() => Date)
  @IsDate({ message: 'A data de expiração deve ser uma data válida' })
  expirationDate: Date;
}
