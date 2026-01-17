import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
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
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { CreateTransferRequestUseCase } from '../../application/use-cases/create-transfer-request.use-case';
import { FindOneTransferRequestUseCase } from '../../application/use-cases/find-one-transfer-request.use-case';
import { FindAllTransferRequestUseCase } from '../../application/use-cases/find-all-transfer-request.use-case';
import { TransferRequestFilterDto } from '../../application/dtos/transfer-request-filter.dto';
import { CreateTransferRequestRequestDto } from '../../application/dtos/create-transfer-request-request.dto';
import { UpdateTransferRequestUseCase } from '../../application/use-cases/update-transfer-request.use-case';
import { DeleteTransferRequestUseCase } from '../../application/use-cases/delete-transfer-request.use-case';
import { TransferRequestUpdateDto } from '../../application/dtos/transfer-request-update.dto';
import { TransferRequestUpdateStatusDto } from '../../application/dtos/transfer-request-update-status.dto';
import { TransferRequestItemUpdateDto } from '../../application/dtos/transfer-request-item-update.dto';
import { UpdateTransferRequestItemUseCase } from '../../application/use-cases/update-transfer-request-item.use-case';

@Controller('transfer/request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TransferRequestProtectedController {
  constructor(
    private readonly createTransferRequestUseCase: CreateTransferRequestUseCase,
    private readonly findOneTransferRequestUseCase: FindOneTransferRequestUseCase,
    private readonly findAllTransferRequestUseCase: FindAllTransferRequestUseCase,
    private readonly updateTransferRequestUseCase: UpdateTransferRequestUseCase,
    private readonly deleteTransferRequestUseCase: DeleteTransferRequestUseCase,
    private readonly updateTransferRequestItemUseCase: UpdateTransferRequestItemUseCase,
  ) {}

  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
  @Get()
  @ResponseMessage('Requisições de transferência encontradas com sucesso')
  findAll(@Query() filters: TransferRequestFilterDto) {
    return this.findAllTransferRequestUseCase.execute(filters);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR)
  @Get(':uuid')
  @ResponseMessage('Requisição de transferência encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneTransferRequestUseCase.execute(uuid);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR)
  @Post()
  @ResponseMessage('Requisição de transferência cadastrada com sucesso')
  create(
    @Body() request: CreateTransferRequestRequestDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.createTransferRequestUseCase.execute(
      request.transferRequest,
      request.items,
      userId,
    );
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR)
  @Patch('item/:uuid')
  @ResponseMessage('Item da requisição de transferência atualizada com sucesso')
  updateItem(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: TransferRequestItemUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateTransferRequestItemUseCase.execute(uuid, dto, userId);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR)
  @Patch(':uuid')
  @ResponseMessage('Requisição de transferência atualizada com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: TransferRequestUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateTransferRequestUseCase.execute(uuid, dto, userId);
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Put(':uuid')
  @ResponseMessage(
    'Status da requisição de transferência atualizado com sucesso',
  )
  updateTransferRequestStatus(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: TransferRequestUpdateStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateTransferRequestUseCase.updateStatusTransfer(
      uuid,
      dto,
      userId,
    );
  }

  @Roles(RoleEnum.ADMIN, RoleEnum.OPERADOR)
  @Delete(':uuid')
  @ResponseMessage('Requisição de transferência deletada com sucesso')
  delete(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @CurrentUser('id') userId: number,
  ) {
    return this.deleteTransferRequestUseCase.execute(uuid, userId);
  }
}
