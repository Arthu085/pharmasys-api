import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { StockLocationService } from '../services/stock_location.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';

@Controller('stock/location')
export class StockLocationController {
  constructor(private readonly stockLocationService: StockLocationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  findAllStockLocations() {
    return this.stockLocationService.findAllStockLocations();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  findStockLocationById(@Param('id') id: number) {
    return this.stockLocationService.findStockLocationById(id);
  }
}
