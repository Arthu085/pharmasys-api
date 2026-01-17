import { Expose, Transform } from 'class-transformer';
import { UUID } from 'crypto';

import { StatusEnumTranslated } from 'src/shared/enums/status.enum';

export class StockLocationResponseAllDto {
  @Expose()
  uuid: UUID;

  @Expose()
  @Transform(({ obj }) => {
    const nameMap = {
      ESTOQUE_CENTRAL: 'Estoque Central',
    };
    return nameMap[obj.name] || obj.name;
  })
  name: string;

  @Expose()
  code: string;

  @Expose()
  isCentralStock: boolean;

  @Expose()
  @Transform(({ obj }) => ({
    value: obj.status,
    label:
      StatusEnumTranslated[obj.status as keyof typeof StatusEnumTranslated],
  }))
  status: { value: string; label: string };
}
