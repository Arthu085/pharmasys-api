import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';

export class CompanyCreateDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O CNPJ é obrigatório' })
  @IsString({ message: 'O CNPJ deve ser uma string' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  @Matches(/^\d{14}$/, {
    message: 'O CNPJ deve conter 14 dígitos',
  })
  cnpj: string;

  @IsArray()
  @IsNotEmpty({ message: 'O tipo de empresa é obrigatório' })
  @IsEnum(CompanyTypeEnum, {
    each: true,
    message: 'Os tipos de empresa devem ser um enum',
  })
  companyTypes: CompanyTypeEnum[];
}
