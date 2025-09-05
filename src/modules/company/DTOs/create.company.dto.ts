import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyTypeEnum } from '../enums/company-type.enum';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @IsString({ message: 'O CNPJ deve ser uma string' })
  @MinLength(14, { message: 'O CNPJ deve ter no mínimo 14 caracteres' })
  @MaxLength(14, { message: 'O nome deve ter no máximo 14 caracteres' })
  cnpj: string;

  @IsArray()
  @IsNotEmpty({ message: 'O tipo de empresa é obrigatório' })
  @IsEnum(Object.keys(CompanyTypeEnum), {
    each: true,
    message: 'Os tipos de empresa devem ser um enum',
  })
  companyTypes: CompanyTypeEnum[];
}
