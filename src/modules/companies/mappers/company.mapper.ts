import { ResponseCompanyDto } from '../DTOs/response.company.dto';
import { Company } from '../entities/company.entity';
import { toResponseUserDto } from 'src/modules/users/mappers/user.mapper';

export function toResponseCompanyDto(company: Company): ResponseCompanyDto {
  return {
    id: company.id,
    name: company.name,
    cnpj: company.cnpj,
    company_type_rel: company.companyTypeRels,
    company_type: company.companyTypeRels.map((rel) => rel.companyType),
    user: toResponseUserDto(company.user),
    user_id: company.user_id,
  };
}
