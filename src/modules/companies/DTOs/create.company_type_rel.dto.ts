import { IsIn, IsNotEmpty } from 'class-validator';
import { CompanyTypeEnum } from 'src/common/enums/company_type.enum';

export class CreateCompanyTypeRelDto {
  @IsNotEmpty({ message: 'O ID do fornecedor ou fabricante é obrigatório' })
  companyId: number;

  @IsNotEmpty({ message: 'O tipo de fornecedor ou fabricante é obrigatório' })
  @IsIn(Object.keys(CompanyTypeEnum), {
    message: `O tipo de empresa deve ser um dos seguintes valores: ${Object.keys(CompanyTypeEnum).join(', ')}.`,
  })
  companyType: CompanyTypeEnum;
}
