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
import { UUID } from 'crypto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { CreateStockTransferUseCase } from '../../application/use-cases/create-stock-transfer.use-case';
import { FindOneStockTransferUseCase } from '../../application/use-cases/find-one-stock-transfer.use-case';
import { FindAllStockTransferUseCase } from '../../application/use-cases/find-all-stock-transfer.use-case';
import { StockTransferFilterDto } from '../../application/dtos/stock-transfer-filter.dto';
import { CreateStockTransferRequestDto } from '../../application/dtos/create-stock-transfer-request.dto';

@Controller('stock/transfer')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class StockTransferProtectedController {
  constructor(
    private readonly createStockTransferUseCase: CreateStockTransferUseCase,
    private readonly findOneStockTransferUseCase: FindOneStockTransferUseCase,
    private readonly findAllStockTransferUseCase: FindAllStockTransferUseCase,
  ) {}

  @Get()
  @ResponseMessage('Transferências de estoque encontradas com sucesso')
  findAll(@Query() filters: StockTransferFilterDto) {
    return this.findAllStockTransferUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Transferência de estoque encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneStockTransferUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Transferência de estoque cadastrada com sucesso')
  create(
    @Body() request: CreateStockTransferRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createStockTransferUseCase.execute(
      request.transfer,
      request.items,
      userId,
    );
  }
}
