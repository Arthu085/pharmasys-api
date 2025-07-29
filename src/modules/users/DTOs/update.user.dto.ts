import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import { IsIn, IsOptional } from 'class-validator';
import { StatusEnum } from 'src/common/enums/status.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsIn(['A', 'I'])
  @IsOptional()
  status?: keyof typeof StatusEnum;
}
