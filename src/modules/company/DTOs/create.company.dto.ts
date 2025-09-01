import {
  IsArray,
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyTypeEnum } from '../enums/company-type.enum';

export class CreateCompanyDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @MinLength(14, { message: 'O CNPJ deve ter no mínimo 14 caracteres' })
  @MaxLength(14, { message: 'O nome deve ter no máximo 14 caracteres' })
  cnpj: string;

  @IsArray()
  @IsNotEmpty({ message: 'O tipo de empresa é obrigatório' })
  @IsIn(Object.keys(CompanyTypeEnum), {
    each: true,
    message: `O tipo de empresa deve ser um dos seguintes valores: ${Object.keys(CompanyTypeEnum).join(', ')}.`,
  })
  companyTypes: CompanyTypeEnum[];
}
