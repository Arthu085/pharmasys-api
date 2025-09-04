import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../DTOs/create.user.dto';
import { UpdateUserDto } from '../DTOs/update.user.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RolesGuard } from '../../auth/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { FilterUserDto } from '../DTOs/filter.user.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Get()
  @ResponseMessage('Usuários encontrados com sucesso')
  findAllUsers(@Query() filters: FilterUserDto) {
    return this.userService.findAllUsers(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Get(':id')
  @ResponseMessage('Usuário encontrado com sucesso')
  findByIdUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findByIdUser(id);
  }

  @Get('roles')
  @ResponseMessage('Funções encontradas com sucesso')
  findAllRoles() {
    return this.userService.findAllRoles();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Post()
  @ResponseMessage('Usuário cadastrado com sucesso')
  createUser(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Post('register')
  @ResponseMessage('Usuário registrado com sucesso')
  registerUser(@Body() dto: CreateUserDto) {
    return this.userService.registerUser(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Patch(':id')
  @ResponseMessage('Usuário atualizado com sucesso')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
    @User('id') userId: number,
  ) {
    return this.userService.updateUser(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A)
  @Put(':id')
  @ResponseMessage('Status do usuário atualizado com sucesso')
  changeStatusUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: ChangeStatusDto,
    @User('id') userId: number,
  ) {
    return this.userService.changeStatusUser(id, dto, userId);
  }
}
