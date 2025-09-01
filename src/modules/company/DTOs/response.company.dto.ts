import { ResponseUserDto } from 'src/modules/user/DTOs/response.user.dto';
import { StatusEnum } from 'src/shared/status.enum';
import { ResponseCompanyTypeDto } from './response.company-type.dto';

export class ResponseCompanyDto {
  id: number;
  name: string;
  cnpj: string;
  companyStatus: StatusEnum;
  createdAt: Date;
  updatedAt: Date | null;
  userCreated: ResponseUserDto;
  userUpdated: ResponseUserDto | null;
  companyTypes: ResponseCompanyTypeDto[];
}
