import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { CompanyTypeEnum } from 'src/common/enums/company_type.enum';

export class CreateCompanyTypeRelDto {
  @IsNotEmpty({ message: 'O tipo de fornecedor ou fabricante é obrigatório' })
  @IsArray()
  @ArrayMinSize(1)
  @ArrayMaxSize(2)
  @IsIn(Object.keys(CompanyTypeEnum), {
    each: true,
    message: `O tipo de empresa deve ser um dos seguintes valores: ${Object.keys(CompanyTypeEnum).join(', ')}.`,
  })
  companyTypes: CompanyTypeEnum[];
}
