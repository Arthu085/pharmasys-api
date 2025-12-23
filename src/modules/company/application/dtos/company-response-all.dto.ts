import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { CompanyTypeEnumTranslated } from '../../../company/domain/enums/company-type.enum';
import { CompanyTypeResponseDto } from './company-type-response.dto';

export class CompanyResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  name: string;

  @Expose()
  cnpj: string;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };

  @Expose()
  @Type(() => CompanyTypeResponseDto)
  @Transform(({ obj }) => {
    return obj.companyTypes.map((type: { name: string }) => ({
      value: type.name,
      label:
        CompanyTypeEnumTranslated[
          type.name as keyof typeof CompanyTypeEnumTranslated
        ],
    })) as Array<{ value: string; label: string }>;
  })
  companyTypes: CompanyTypeResponseDto[];
}
