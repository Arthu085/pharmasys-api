import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreateItemDto } from '../DTOs/create.item.dto';
import { User } from 'src/common/decorators/user.decorator';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  findAllItem() {
    return this.itemService.findAllItems();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  findItemById(@Param('id') id: number) {
    return this.itemService.findItemById(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  createItem(@Body() createItemDto: CreateItemDto, @User('id') userId: number) {
    return this.itemService.createItem(createItemDto, userId);
  }
}
