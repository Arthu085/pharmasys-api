import { IsEmail, IsEnum, IsNotEmpty, MinLength } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  name: string;

  @IsNotEmpty({ message: 'O e-mail é obrigatório' })
  @IsEmail({}, { message: 'O e-mail fornecido não é válido' })
  email: string;

  @IsNotEmpty({ message: 'A senha é obrigatória' })
  @MinLength(6, { message: 'A senha deve ter no mínimo 6 caracteres' })
  password: string;

  @IsEnum(RoleEnum, {
    message: `O campo de função deve ser um dos seguintes valores: FARMACEUTICO ou OPERADOR.`,
  })
  role: RoleEnum;
}
