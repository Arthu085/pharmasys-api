import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { CreateItemUseCase } from '../../application/use-cases/create-item.use-case';
import { UpdateItemUseCase } from '../../application/use-cases/update-item.use-case';
import { FindOneItemUseCase } from '../../application/use-cases/find-one-item.use-case';
import { FindAllItemUseCase } from '../../application/use-cases/find-all-item.use-case';
import { DeleteItemUseCase } from '../../application/use-cases/delete-item.use-case';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { ItemFilterDto } from '../../application/dtos/item-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { ItemCreateDto } from '../../application/dtos/item-create.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { ItemUpdateDto } from '../../application/dtos/item-update.dto';

@Controller('item')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class ItemProtectedController {
  constructor(
    private readonly createItemUseCase: CreateItemUseCase,
    private readonly updateItemUseCase: UpdateItemUseCase,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    private readonly findAllItemUseCase: FindAllItemUseCase,
    private readonly deleteItemUseCase: DeleteItemUseCase,
  ) {}

  @Get()
  @ResponseMessage('Itens encontrados com sucesso')
  findAll(@Query() filters: ItemFilterDto) {
    return this.findAllItemUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Item encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.findOneItemUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Item cadastrado com sucesso')
  create(@Body() dto: ItemCreateDto, @CurrentUser('id') userId: number) {
    return this.createItemUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Item atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: ItemUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateItemUseCase.execute(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Item deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.deleteItemUseCase.execute(uuid);
  }
}
