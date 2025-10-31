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
import { ItemService } from '../services/item.service';
import { JwtAuthGuard, RolesGuard } from 'src/core/guards';
import { Roles, ResponseMessage, User } from 'src/core/decorators';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { UpdateItemDto } from '../DTOs/update.item.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterItemDto } from '../DTOs/filter.item.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  @ResponseMessage('Itens encontrados com sucesso')
  findAllItems(@Query() filters: FilterItemDto) {
    return this.itemService.findAllItems(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  @ResponseMessage('Item encontrado com sucesso')
  findByIdItem(@Param('id') id: number) {
    return this.itemService.findByIdItem(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  @ResponseMessage('Item cadastrado com sucesso')
  createItem(@Body() dto: CreateItemDto, @User('id') userId: number) {
    return this.itemService.createItem(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Patch(':id')
  @ResponseMessage('Item atualizado com sucesso')
  updateItem(
    @Param('id') id: number,
    @Body() dto: UpdateItemDto,
    @User('id') userId: number,
  ) {
    return this.itemService.updateItem(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Put(':id')
  @ResponseMessage('Status do item atualizado com sucesso')
  changeStatusItem(
    @Param('id') id: number,
    @Body() dto: ChangeStatusDto,
    @User('id') userId: number,
  ) {
    return this.itemService.changeStatusItem(id, dto, userId);
  }
}
