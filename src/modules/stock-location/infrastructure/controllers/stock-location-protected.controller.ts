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
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { CreateStockLocationUseCase } from '../../application/use-cases/create-stock-location.use-case';
import { UpdateStockLocationUseCase } from '../../application/use-cases/update-stock-location.use-case';
import { FindOneStockLocationUseCase } from '../../application/use-cases/find-one-stock-location.use-case';
import { FindAllStockLocationUseCase } from '../../application/use-cases/find-all-stock-location.use-case';
import { DeleteStockLocationUseCase } from '../../application/use-cases/delete-stock-location.use-case';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { StockLocationFilterDto } from '../../application/dtos/stock-location-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { StockLocationCreateDto } from '../../application/dtos/stock-location-create.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { StockLocationUpdateDto } from '../../application/dtos/stock-location-update.dto';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Controller('stock/location')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class StockLocationProtectedController {
  constructor(
    private readonly createStockLocationUseCase: CreateStockLocationUseCase,
    private readonly updateStockLocationUseCase: UpdateStockLocationUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findAllStockLocationUseCase: FindAllStockLocationUseCase,
    private readonly deleteStockLocationUseCase: DeleteStockLocationUseCase,
  ) {}

  @Get()
  @ResponseMessage('Locais de estoque encontrados com sucesso')
  findAll(@Query() filters: StockLocationFilterDto) {
    return this.findAllStockLocationUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Local de estoque encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.findOneStockLocationUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Local de estoque cadastrado com sucesso')
  create(
    @Body() dto: StockLocationCreateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createStockLocationUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Local de estoque atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: StockLocationUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateStockLocationUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status do local de estoque atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateStockLocationUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Local de estoque deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.deleteStockLocationUseCase.execute(uuid);
  }
}
