import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StockLocationService } from '../services/stock-location.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateStockLocationDto } from '../DTOs/create.stock-location.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateStockLocationDto } from '../DTOs/update.stock-location.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterStockLocationDto } from '../DTOs/filter.stock-location.dto';

@Controller('stock/location')
export class StockLocationController {
  constructor(private readonly stockLocationService: StockLocationService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get()
  @ResponseMessage('Locais de estoque encontrados com sucesso')
  findAllStockLocations(@Query() filters: FilterStockLocationDto) {
    return this.stockLocationService.findAllStockLocations(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get(':id')
  @ResponseMessage('Local de estoque encontrado com sucesso')
  findByIdStockLocation(@Param('id') id: number) {
    return this.stockLocationService.findByIdStockLocation(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Post()
  @ResponseMessage('Local de estoque cadastrado com sucesso')
  createStockLocation(
    @Body() dto: CreateStockLocationDto,
    @User('id') userId: number,
  ) {
    return this.stockLocationService.createStockLocation(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Patch(':id')
  @ResponseMessage('Local de estoque atualizado com sucesso')
  updateStockLocation(
    @Param('id') id: number,
    @Body() dto: UpdateStockLocationDto,
    @User('id') userId: number,
  ) {
    return this.stockLocationService.updateStockLocation(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Put(':id')
  @ResponseMessage('Status do local de estoque atualizado com sucesso')
  changeStatusStockLocation(
    @Param('id') id: number,
    @Body() dto: ChangeStatusDto,
    @User('id') userId: number,
  ) {
    return this.stockLocationService.changeStatusStockLocation(id, dto, userId);
  }
}
