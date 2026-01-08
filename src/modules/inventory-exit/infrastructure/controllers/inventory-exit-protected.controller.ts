import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { FindOneInventoryExitUseCase } from '../../application/use-cases/find-one-inventory-exit.use-case';
import { FindAllInventoryExitUseCase } from '../../application/use-cases/find-all-inventory-exit.use-case';
import { InventoryExitFilterDto } from '../../application/dtos/inventory-exit-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { UUID } from 'crypto';
import { CreateInventoryExitRequestDto } from '../../application/dtos/create-inventory-exit-request.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { CreateInventoryExitUseCase } from '../../application/use-cases/create-inventory-exit.use-case';

@Controller('inventory/exit')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
export class InventoryExitProtectedController {
  constructor(
    private readonly createInventoryExitUseCase: CreateInventoryExitUseCase,
    private readonly findOneInventoryExitUseCase: FindOneInventoryExitUseCase,
    private readonly findAllInventoryExitUseCase: FindAllInventoryExitUseCase,
  ) {}

  @Get()
  @ResponseMessage('Saídas de estoque encontradas com sucesso')
  findAll(@Query() filters: InventoryExitFilterDto) {
    return this.findAllInventoryExitUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Saída de estoque encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneInventoryExitUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Saída de estoque cadastrada com sucesso')
  create(
    @Body() request: CreateInventoryExitRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createInventoryExitUseCase.execute(
      request.exit,
      request.items,
      userId,
    );
  }
}
