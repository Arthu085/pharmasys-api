import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'O nome do fornecedor ou fabricante é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @MinLength(14, { message: 'O CNPJ deve ter no mínimo 14 caracteres' })
  @MaxLength(18, { message: 'O CNPJ deve ter no máximo 18 caracteres' })
  cnpj: string;
}
