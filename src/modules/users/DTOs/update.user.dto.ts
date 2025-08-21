import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';
import { Type } from 'class-transformer';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsIn(Object.keys(GlobalStatusEnum), {
    message: `O campo "status" deve ser um dos seguintes valores: ${Object.keys(GlobalStatusEnum).join(', ')}.`,
  })
  userStatus?: GlobalStatusEnum;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de atualização é obrigatória' })
  updatedAt: Date;

  @IsNumber({}, { message: 'O campo de usuário deve ser um número.' })
  @IsNotEmpty({ message: 'O campo de usuário é obrigatório.' })
  userUpdated: number;
}
