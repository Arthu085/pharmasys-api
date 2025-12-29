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
import { UUID } from 'crypto';
import { Roles } from 'src/modules/auth/infrastructure/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/infrastructure/guards/roles.guard';
import { RoleEnum } from 'src/shared/enums/role.enum';

import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { CreateBatchUseCase } from '../../application/use-cases/create-batch.use-case';
import { UpdateBatchUseCase } from '../../application/use-cases/update-batch.use-case';
import { FindOneBatchUseCase } from '../../application/use-cases/find-one-batch.use-case';
import { FindAllBatchUseCase } from '../../application/use-cases/find-all-batch.use-case';
import { DeleteBatchUseCase } from '../../application/use-cases/delete-batch.use-case';
import { BatchFilterDto } from '../../application/dtos/batch-filter.dto';
import { BatchCreateDto } from '../../application/dtos/batch-create.dto';
import { BatchUpdateDto } from '../../application/dtos/batch-update.dto';

@Controller('batch')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class BatchProtectedController {
  constructor(
    private readonly createBatchUseCase: CreateBatchUseCase,
    private readonly updateBatchUseCase: UpdateBatchUseCase,
    private readonly findOneBatchUseCase: FindOneBatchUseCase,
    private readonly findAllBatchUseCase: FindAllBatchUseCase,
    private readonly deleteBatchUseCase: DeleteBatchUseCase,
  ) {}

  @Get()
  @ResponseMessage('Lotes encontrados com sucesso')
  findAll(@Query() filters: BatchFilterDto) {
    return this.findAllBatchUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Lote encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOneBatchUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Lote cadastrado com sucesso')
  create(@Body() dto: BatchCreateDto, @CurrentUser('id') userId: number) {
    return this.createBatchUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Lote atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: BatchUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateBatchUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status do lote atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateBatchUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Lote deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.deleteBatchUseCase.execute(uuid);
  }
}
