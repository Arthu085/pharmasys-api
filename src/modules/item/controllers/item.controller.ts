import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

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
}
