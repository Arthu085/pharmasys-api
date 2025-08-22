import { IsIn, IsNotEmpty } from 'class-validator';
import { StatusEnum } from './status.enum';

export class ChangeStatusDto {
  @IsNotEmpty({ message: 'O campo status não pode ser vazio' })
  @IsIn(Object.values(StatusEnum), {
    message: 'O status deve ser ativo ou inativo',
  })
  status: StatusEnum;
}
