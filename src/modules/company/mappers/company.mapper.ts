import { toResponseUserDto } from 'src/modules/user/mappers/user.mapper';
import { Company } from '../entities/company.entity';
import { ResponseCompanyDto } from '../DTOs/response.company.dto';

export function toResponseCompanyDto(company: Company): ResponseCompanyDto {
  const responseDto = new ResponseCompanyDto();

  responseDto.id = company.id;
  responseDto.name = company.name;
  responseDto.cnpj = company.cnpj;
  responseDto.status = company.status;
  responseDto.createdAt = company.createdAt;
  responseDto.updatedAt = company.updatedAt;
  responseDto.userCreated = company.userCreated
    ? toResponseUserDto(company.userCreated)
    : null;
  responseDto.userUpdated = company.userUpdated
    ? toResponseUserDto(company.userUpdated)
    : null;
  responseDto.companyTypes = company.companyTypes;

  return responseDto;
}
