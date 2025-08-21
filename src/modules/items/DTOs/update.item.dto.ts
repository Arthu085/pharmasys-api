import { PartialType } from '@nestjs/mapped-types';
import { CreateItemDto } from './create.item.dto';
import {
  IsDate,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty({ message: 'A data de atualização é obrigatória' })
  updatedAt: Date;

  @IsNumber({}, { message: 'O campo de usuário deve ser um número.' })
  @IsNotEmpty({ message: 'O campo de usuário é obrigatório.' })
  userUpdated: number;

  @IsOptional()
  @IsIn(Object.keys(GlobalStatusEnum), {
    message: `O campo "status" deve ser um dos seguintes valores: ${Object.keys(GlobalStatusEnum).join(', ')}.`,
  })
  itemStatus?: GlobalStatusEnum;
}
