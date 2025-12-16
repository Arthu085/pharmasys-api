import { Expose, Transform, Type } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { CompanyTypeResponseDto } from './company-type-response.dto';

export class CompanyResponseDto {
  @Expose()
  id: number;

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
  @Transform(({ obj }) => obj.userCreated?.name)
  userCreated: string;

  @Expose()
  @Transform(({ obj }) => obj.userUpdated?.name || null)
  userUpdated: string | null;

  @Expose()
  @Type(() => CompanyTypeResponseDto)
  companyTypes: CompanyTypeResponseDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date | null;

  @Expose()
  deletedAt: Date | null;
}
