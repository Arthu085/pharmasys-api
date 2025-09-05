import { IsEnum, IsOptional, IsString } from 'class-validator';
import { FilterDto } from 'src/shared/DTOs/filter.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

export class FilterUserDto extends FilterDto {
  @IsOptional()
  @IsString({ message: 'O nome deve ser uma string' })
  name?: string;

  @IsOptional()
  @IsEnum(Object.keys(StatusEnum), { message: 'O status deve ser um enum' })
  status?: StatusEnum;

  @IsOptional()
  @IsEnum(Object.keys(RoleEnum), { message: 'A função deve ser um enum' })
  role?: RoleEnum;
}
