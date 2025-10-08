import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { UfEnum } from '../enums/uf.enum';
import { AdviceEnum } from '../enums/advice.enum';

export class CreatePrescriptorDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(150, { message: 'O nome deve ter no máximo 150 caracteres' })
  name: string;

  @IsString({ message: 'O número de registro deve ser uma string' })
  @IsNotEmpty({ message: 'O número de registro é obrigatório' })
  @MinLength(3, {
    message: 'O número de registro deve ter no mínimo 3 caracteres',
  })
  @MaxLength(30, {
    message: 'O número de registro deve ter no máximo 30 caracteres',
  })
  registrationNumber: string;

  @IsString({ message: 'A especialidade deve ser uma string' })
  @MinLength(3, {
    message: 'A especialidade deve ter no mínimo 3 caracteres',
  })
  @MaxLength(150, {
    message: 'A especialidade deve ter no máximo 150 caracteres',
  })
  @IsOptional()
  specialty?: string | null;

  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @IsEnum(Object.keys(UfEnum), {
    message: 'O estado deve ser um enum',
  })
  state: UfEnum;

  @IsNotEmpty({ message: 'O conselho é obrigatório' })
  @IsEnum(Object.keys(AdviceEnum), {
    message: 'O conselho deve ser um enum',
  })
  advice: AdviceEnum;
}
