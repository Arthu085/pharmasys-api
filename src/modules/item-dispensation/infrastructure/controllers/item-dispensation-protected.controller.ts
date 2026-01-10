import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { UUID } from 'crypto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { CreateItemDispensationUseCase } from '../../application/use-cases/create-item-dispensation.use-case';
import { FindOneItemDispensationUseCase } from '../../application/use-cases/find-one-item-dispensation.use-case';
import { FindAllItemDispensationUseCase } from '../../application/use-cases/find-all-item-dispensation.use-case';
import { ItemDispensationFilterDto } from '../../application/dtos/item-dispensation-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { CreateItemDispensationRequestDto } from '../../application/dtos/create-item-dispensation-request.dto';

@Controller('item/dispensation')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
export class ItemDispensationProtectedController {
  constructor(
    private readonly createItemDispensationUseCase: CreateItemDispensationUseCase,
    private readonly findOneItemDispensationUseCase: FindOneItemDispensationUseCase,
    private readonly findAllItemDispensationUseCase: FindAllItemDispensationUseCase,
  ) {}

  @Get()
  @ResponseMessage('Saídas de dispensação encontradas com sucesso')
  findAll(@Query() filters: ItemDispensationFilterDto) {
    return this.findAllItemDispensationUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Saída de dispensação encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneItemDispensationUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Saída de dispensação cadastrada com sucesso')
  create(
    @Body() request: CreateItemDispensationRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createItemDispensationUseCase.execute(
      request.dispensation,
      request.items,
      userId,
    );
  }
}
