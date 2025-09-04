import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { CompanyTypeEnum } from '../enums/company-type.enum';
import { FilterDto } from 'src/shared/DTOs/filter.dto';

export class FilterCompanyDto extends FilterDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  cnpj?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(CompanyTypeEnum)
  companyType?: CompanyTypeEnum;
}
