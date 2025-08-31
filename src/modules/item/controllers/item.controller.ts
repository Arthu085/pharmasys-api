import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateItemDto } from '../DTOs/update.item.dto';
import { ChangeStatusDto } from 'src/shared/change-status.dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get()
  @ResponseMessage('Itens encontrados com sucesso')
  findAllItems() {
    return this.itemService.findAllItems();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get(':id')
  @ResponseMessage('Item encontrado com sucesso')
  findByIdItem(@Param('id') id: number) {
    return this.itemService.findByIdItem(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Post()
  @ResponseMessage('Item cadastrado com sucesso')
  createItem(@Body() dto: CreateItemDto, @User('id') userId: number) {
    return this.itemService.createItem(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
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
  @Roles(RoleEnum.A, RoleEnum.F)
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
