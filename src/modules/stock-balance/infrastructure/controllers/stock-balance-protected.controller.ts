import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { FindAllStockBalanceUseCase } from '../../application/use-cases/find-all-stock-balance.use-case';
import { StockBalanceFilterDto } from '../../application/dtos/stock-balance-filter.dto';

@Controller('stock/balance')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
export class StockBalanceProtectedController {
  constructor(
    private readonly findAllStockBalanceUseCase: FindAllStockBalanceUseCase,
  ) {}

  @Get()
  @ResponseMessage('Saldos de estoque encontrados com sucesso')
  findAll(@Query() filters: StockBalanceFilterDto) {
    return this.findAllStockBalanceUseCase.execute(filters);
  }
}
