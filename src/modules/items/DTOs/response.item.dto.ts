import { ResponseUserDto } from 'src/modules/users/DTOs/response.user.dto';
import { Dosage } from '../entities/dosage.entity';
import { Presentation } from '../entities/presentation.entity';
import { Subtype } from '../entities/subtype.entity';
import { Type } from '../entities/type.entity';

export class ResponseItemDto {
  id: number;
  name: string;
  type: Type;
  presentation: Presentation;
  dosage: Dosage;
  subtype: Subtype | null;
  itemStatus: string;
  createdAt: Date;
  updatedAt?: Date;
  userCreated: ResponseUserDto;
  userUpdated?: ResponseUserDto;
}
