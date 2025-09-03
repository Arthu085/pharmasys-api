import { IsIn, IsNotEmpty } from 'class-validator';
import { StatusEnum } from '../enums/status.enum';

export class ChangeStatusDto {
  @IsNotEmpty({ message: 'O campo status não pode ser vazio' })
  @IsIn(Object.values(StatusEnum), {
    message: `O status deve ser um dos seguintes valores: ${Object.values(StatusEnum).join(', ')}`,
  })
  status: StatusEnum;
}
