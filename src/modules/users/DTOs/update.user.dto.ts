import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import { IsIn, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/enums/status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsIn(Object.keys(StatusEnum), {
    message: `O campo "status" deve ser um dos seguintes valores: ${Object.keys(StatusEnum).join(', ')}.`,
  })
  status?: StatusEnum;
}
