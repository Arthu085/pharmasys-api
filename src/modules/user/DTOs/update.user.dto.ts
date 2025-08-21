import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create.user.dto';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNumber({}, { message: 'O ID deve ser um número' })
  @IsNotEmpty({ message: 'O ID do usuário que atualizou é obrigatório' })
  userUpdated: number;
}
