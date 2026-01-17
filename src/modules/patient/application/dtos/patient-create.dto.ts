import { Transform } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class PatientCreateDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name: string;

  @IsString({ message: 'O documento deve ser uma string' })
  @IsNotEmpty({ message: 'O documento é obrigatório' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{11}$/, {
    message: 'O documento deve conter 11 dígitos',
  })
  document: string;
}
