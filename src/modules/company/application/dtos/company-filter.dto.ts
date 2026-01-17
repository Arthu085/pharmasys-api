import { Transform } from 'class-transformer';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { CompanyTypeEnum } from '../../domain/enums/company-type.enum';
import { FilterDto } from 'src/shared/dtos/filter.dto';

export class CompanyFilterDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'O CNPJ deve ser uma string' })
  @Transform(({ value }) => value?.replace(/\D/g, ''))
  cnpj?: string;

  @IsOptional()
  @IsEnum(StatusEnum, { message: 'O status deve ser um enum' })
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(CompanyTypeEnum, {
    message: 'O tipo de empresa deve ser um enum',
  })
  companyType?: CompanyTypeEnum;
}
