import { IsEnum, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';

export class ChangeStatusDto {
  @IsNotEmpty({ message: 'O campo status não pode ser vazio' })
  @IsEnum(Object.keys(StatusEnum), {
    message: 'O status deve ser um enum',
  })
  status: StatusEnum;
}
