import { IsNotEmptyObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCompanyTypeRelDto } from './create.company_type_rel.dto';
import { CreateCompanyDto } from './create.company.dto';

export class CreateCompanyRequestDto {
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCompanyDto)
  company: CreateCompanyDto;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CreateCompanyTypeRelDto)
  companyTypeRel: CreateCompanyTypeRelDto;
}
