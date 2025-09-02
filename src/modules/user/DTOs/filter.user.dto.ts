import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class FilterUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsOptional()
  @IsIn(Object.keys(RoleEnum))
  role?: RoleEnum;
}
