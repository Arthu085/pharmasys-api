import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleEnum } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(RoleEnum)
  role: RoleEnum;
}
