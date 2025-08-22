import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StockLocationService } from '../services/stock-location.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateStockLocationDto } from '../DTOs/create.stock-location.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('stock/location')
export class StockLocationController {
  constructor(private readonly stockLocationService: StockLocationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get()
  @ResponseMessage('Locais de estoque encontrados com sucesso')
  findAllStockLocations() {
    return this.stockLocationService.findAllStockLocations();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get(':id')
  @ResponseMessage('Local de estoque encontrado com sucesso')
  findByIdStockLocation(id: number) {
    return this.stockLocationService.findByIdStockLocation(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Post()
  @ResponseMessage('Local de estoque cadastrado com sucesso')
  createStockLocation(
    @Body() dto: CreateStockLocationDto,
    @User('id') id: number,
  ) {
    return this.stockLocationService.createStockLocation(dto, id);
  }
}
