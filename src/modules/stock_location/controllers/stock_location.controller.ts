import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { StockLocationService } from '../services/stock_location.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreateStockLocationDto } from '../DTOs/create.stock_location.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateStockLocationDto } from '../DTOs/update.stock_location.dto';

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

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  createStockLocation(
    @Body() dto: CreateStockLocationDto,
    @User('id') userId: number,
  ) {
    return this.stockLocationService.createStockLocation(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Delete(':id')
  deleteStockLocation(@Param('id') id: number) {
    return this.stockLocationService.deleteStockLocation(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Patch(':id')
  updateStockLocation(
    @Param('id') id: number,
    @Body() dto: UpdateStockLocationDto,
  ) {
    return this.stockLocationService.updateStockLocation(id, dto);
  }
}
