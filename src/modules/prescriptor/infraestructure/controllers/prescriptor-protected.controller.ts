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

import { CreatePrescriptorUseCase } from '../../application/use-cases/create-prescriptor.use-case';
import { UpdatePrescriptorUseCase } from '../../application/use-cases/update-prescriptor.use-case';
import { FindOnePrescriptorUseCase } from '../../application/use-cases/find-one-prescriptor.use-case';
import { FindAllPrescriptorUseCase } from '../../application/use-cases/find-all-prescriptor.use-case';
import { DeletePrescriptorUseCase } from '../../application/use-cases/delete-prescriptor.use-case';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { PrescriptorFilterDto } from '../../application/dtos/prescriptor-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { PrescriptorCreateDto } from '../../application/dtos/prescriptor-create.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { PrescriptorUpdateDto } from '../../application/dtos/prescriptor-update.dto';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Controller('prescriptor')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class PrescriptorProtectedController {
  constructor(
    private readonly createPrescriptorUseCase: CreatePrescriptorUseCase,
    private readonly updatePrescriptorUseCase: UpdatePrescriptorUseCase,
    private readonly findOnePrescriptorUseCase: FindOnePrescriptorUseCase,
    private readonly findAllPrescriptorUseCase: FindAllPrescriptorUseCase,
    private readonly deletePrescriptorUseCase: DeletePrescriptorUseCase,
  ) {}

  @Get()
  @ResponseMessage('Prescriptores encontrados com sucesso')
  findAll(@Query() filters: PrescriptorFilterDto) {
    return this.findAllPrescriptorUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Prescriptor encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.findOnePrescriptorUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Prescriptor cadastrado com sucesso')
  create(@Body() dto: PrescriptorCreateDto, @CurrentUser('id') userId: number) {
    return this.createPrescriptorUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Prescriptor atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: PrescriptorUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updatePrescriptorUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status do prescriptor atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updatePrescriptorUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Prescriptor deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.deletePrescriptorUseCase.execute(uuid);
  }
}
