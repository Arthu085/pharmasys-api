import { ResponseUserDto } from 'src/modules/user/DTOs/response.user.dto';
import { StatusEnum } from 'src/shared/status.enum';
import { Type } from '../entities/type.entity';
import { Presentation } from '../entities/presentation.entity';
import { Dosage } from '../entities/dosage.entity';
import { Subtype } from '../entities/subtype.entity';

export class ResponseItemDto {
  id: number;
  name: string;
  type: Type;
  presentation: Presentation;
  dosage: Dosage;
  subtype: Subtype | null;
  itemStatus: StatusEnum;
  createdAt: Date;
  updatedAt: Date | null;
  userCreated: ResponseUserDto;
  userUpdated: ResponseUserDto | null;
}
