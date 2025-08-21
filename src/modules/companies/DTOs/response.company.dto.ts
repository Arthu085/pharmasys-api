import { ResponseUserDto } from 'src/modules/users/DTOs/response.user.dto';
import { CompanyType } from '../entities/company_type.entity';
import { CompanyTypeRel } from '../entities/company_type_rel.entity';
import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';

export class ResponseCompanyDto {
  id: number;
  name: string;
  cnpj: string;
  companyStatus: GlobalStatusEnum;
  createdAt: Date;
  updatedAt: Date;
  company_type: CompanyType[];
  company_type_rel: CompanyTypeRel[];
  userCreated: ResponseUserDto;
  userUpdated: ResponseUserDto;
}
