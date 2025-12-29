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

import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { CreatePatientUseCase } from '../../application/use-cases/create-patient.use-case';
import { UpdatePatientUseCase } from '../../application/use-cases/update-patient.use-case';
import { FindOnePatientUseCase } from '../../application/use-cases/find-one-patient.use-case';
import { FindAllPatientUseCase } from '../../application/use-cases/find-all-patient.use-case';
import { DeletePatientUseCase } from '../../application/use-cases/delete-patient.use-case';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { PatientFilterDto } from '../../application/dtos/patient-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { PatientCreateDto } from '../../application/dtos/patient-create.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { PatientUpdateDto } from '../../application/dtos/patient-update.dto';

@Controller('patient')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class PatientProtectedController {
  constructor(
    private readonly createPatientUseCase: CreatePatientUseCase,
    private readonly updatePatientUseCase: UpdatePatientUseCase,
    private readonly findOnePatientUseCase: FindOnePatientUseCase,
    private readonly findAllPatientUseCase: FindAllPatientUseCase,
    private readonly deletePatientUseCase: DeletePatientUseCase,
  ) {}

  @Get()
  @ResponseMessage('Pacientes encontrados com sucesso')
  findAll(@Query() filters: PatientFilterDto) {
    return this.findAllPatientUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Paciente encontrado com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.findOnePatientUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Paciente cadastrado com sucesso')
  create(@Body() dto: PatientCreateDto, @CurrentUser('id') userId: number) {
    return this.createPatientUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Paciente atualizado com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: PatientUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updatePatientUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status do paciente atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: UUID,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updatePatientUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Paciente deletado com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: UUID) {
    return this.deletePatientUseCase.execute(uuid);
  }
}
