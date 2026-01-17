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
import { CreateInventoryEntryUseCase } from '../../application/use-cases/create-inventory-entry.use-case';
import { FindOneInventoryEntryUseCase } from '../../application/use-cases/find-one-inventory-entry.use-case';
import { FindAllInventoryEntryUseCase } from '../../application/use-cases/find-all-inventory-entry.use-case';
import { InventoryEntryFilterDto } from '../../application/dtos/inventory-entry-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { UUID } from 'crypto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { CreateInventoryEntryRequestDto } from '../../application/dtos/create-inventory-entry-request.dto';

@Controller('inventory/entry')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
export class InventoryEntryProtectedController {
  constructor(
    private readonly createInventoryEntryUseCase: CreateInventoryEntryUseCase,
    private readonly findOneInventoryEntryUseCase: FindOneInventoryEntryUseCase,
    private readonly findAllInventoryEntryUseCase: FindAllInventoryEntryUseCase,
  ) {}

  @Get()
  @ResponseMessage('Entradas de estoque encontradas com sucesso')
  findAll(@Query() filters: InventoryEntryFilterDto) {
    return this.findAllInventoryEntryUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Entrada de estoque encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneInventoryEntryUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Entrada de estoque cadastrada com sucesso')
  create(
    @Body() request: CreateInventoryEntryRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createInventoryEntryUseCase.execute(
      request.entry,
      request.items,
      userId,
    );
  }
}
