import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateStockLocationDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(50, { message: 'O nome deve ter no máximo 50 caracteres' })
  code: string;
}
