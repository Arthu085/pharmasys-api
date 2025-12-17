import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

import { RoleEnum } from 'src/shared/enums/role.enum';

export class UserCreateDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsString({ message: 'O e-mail deve ser uma string' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(40, { message: 'A senha deve ter no máximo 40 caracteres' })
  password: string;

  @IsEnum(RoleEnum, {
    message: 'A função deve ser um enum',
  })
  role: RoleEnum;
}
