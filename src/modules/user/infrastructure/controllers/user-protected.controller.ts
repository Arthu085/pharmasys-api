import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';

import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { CreateUserUseCase } from '../../application/use-cases/create-user.use-case';
import { DeleteUserUseCase } from '../../application/use-cases/delete-user.use-case';
import { FindAllUserUseCase } from '../../application/use-cases/find-all-user.use-case';
import { FindOneUserUseCase } from '../../application/use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from '../../application/use-cases/update-user.use-case';
import { UserCreateDto } from '../../application/dtos/user-create.dto';
import { UserFilterDto } from '../../application/dtos/user-filter.dto';
import { UserUpdateDto } from '../../application/dtos/user-update.dto';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';

@Controller('user')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN)
export class UserProtectedController {
  constructor(
    private readonly findAllUsersUseCase: FindAllUserUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Get()
  @ResponseMessage('Usuários encontrados com sucesso')
  findAll(@Query() filters: UserFilterDto) {
    return this.findAllUsersUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Usuário encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.findOneUserUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Usuário criado com sucesso')
  create(@Body() dto: UserCreateDto) {
    return this.createUserUseCase.execute(dto);
  }

  @Patch(':uuid')
  @ResponseMessage('Usuário atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: UserUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateUserUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status do usuário atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateUserUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Usuário deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.deleteUserUseCase.execute(uuid);
  }
}
