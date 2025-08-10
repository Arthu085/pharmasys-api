import { ResponseUserDto } from 'src/modules/users/DTOs/response.user.dto';
import { CompanyType } from '../entities/company_type.entity';
import { CompanyTypeRel } from '../entities/company_type_rel.entity';

export class ResponseCompanyDto {
  id: number;
  name: string;
  cnpj: string;
  company_type: CompanyType[];
  company_type_rel: CompanyTypeRel[];
  user: ResponseUserDto;
  user_id: number;
}
