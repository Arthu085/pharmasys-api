import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { CompanyTypeResponseDto } from './company-type-response.dto';
import { CompanyTypeEnumTranslated } from '../../domain/enums/company-type.enum';

export class CompanyResponseOneDto {
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

  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name)
  userCreated: string;

  @Expose()
  @Transform(({ obj }) => obj.userUpdated?.name || null)
  userUpdated: string | null;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
