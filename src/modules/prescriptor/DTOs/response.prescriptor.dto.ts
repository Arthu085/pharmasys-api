import { StatusEnum } from 'src/shared/enums/status.enum';
import { AdviceEntity } from '../entities/advice.entity';
import { ResponseUserDto } from 'src/modules/user/DTOs/response.user.dto';

export class ResponsePrescriptorDto {
  id: number;
  name: string;
  registrationNumber: string;
  speciality: string | null;
  state: string;
  advice: AdviceEntity;
  status: StatusEnum;
  createdAt: Date;
  updatedAt: Date | null;
  userCreated: ResponseUserDto | null;
  userUpdated: ResponseUserDto | null;
}
