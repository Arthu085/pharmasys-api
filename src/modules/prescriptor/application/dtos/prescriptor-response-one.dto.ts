import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';
import { AdviceEnumTranslated } from '../../domain/enums/advice.enum';
import { UfEnumTranslated } from '../../domain/enums/uf.enum';
import { PrescriptorResponseAllDto } from './prescriptor-response-all.dto';

export class PrescriptorResponseOneDto extends PrescriptorResponseAllDto {
  @Expose()
  @Transform(({ obj }) => obj.userCreated?.name || null)
  userCreated: string | null;

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
