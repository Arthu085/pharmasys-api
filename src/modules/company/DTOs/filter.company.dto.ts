import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { CompanyTypeEnum } from '../enums/company-type.enum';
import { FilterDto } from 'src/shared/dtos/filter.dto';

export class FilterCompanyDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O CNPJ deve ser uma string' })
  cnpj?: string;

  @IsOptional()
  @IsEnum(Object.keys(StatusEnum), { message: 'O status deve ser um enum' })
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(Object.keys(CompanyTypeEnum), {
    message: 'O tipo de empresa deve ser um enum',
  })
  companyType?: CompanyTypeEnum;
}
