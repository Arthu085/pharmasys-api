import { CreateCompanyDto } from './create.company.dto';
import { CreateCompanyTypeRelDto } from './create.company_type_rel.dto';

export class CreateCompanyRequestDto {
  company: CreateCompanyDto;
  companyTypeRel: CreateCompanyTypeRelDto;
}
