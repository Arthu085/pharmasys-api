import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  MaxLength,
  MinLength,
} from 'class-validator';
import { RoleEnum } from 'src/shared/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  @MaxLength(255, { message: 'O e-mail deve ter no máximo 255 caracteres' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  @MaxLength(40, { message: 'A senha deve ter no máximo 40 caracteres' })
  password: string;

  @IsIn(Object.keys(RoleEnum), {
    message: 'Função inválida',
  })
  role: RoleEnum;
}
