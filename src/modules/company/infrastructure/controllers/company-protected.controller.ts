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

import { CreateCompanyUseCase } from '../../application/use-cases/create-company.use-case';
import { UpdateCompanyUseCase } from '../../application/use-cases/update-company.use-case';
import { FindOneCompanyUseCase } from '../../application/use-cases/find-one-company.use-case';
import { FindAllCompanyUseCase } from '../../application/use-cases/find-all-company.use-case';
import { DeleteCompanyUseCase } from '../../application/use-cases/delete-company.use-case';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { CompanyFilterDto } from '../../application/dtos/company-filter.dto';
import { UuidValidationPipe } from 'src/shared/pipes/uuid-validation.pipe';
import { CompanyCreateDto } from '../../application/dtos/company-create.dto';
import { CurrentUser } from 'src/modules/auth/infrastructure/decorators/current-user.decorator';
import { CompanyUpdateDto } from '../../application/dtos/company-update.dto';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

@Controller('company')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
export class CompanyProtectedController {
  constructor(
    private readonly createCompanyUseCase: CreateCompanyUseCase,
    private readonly updateCompanyUseCase: UpdateCompanyUseCase,
    private readonly findOneCompanyUseCase: FindOneCompanyUseCase,
    private readonly findAllCompanyUseCase: FindAllCompanyUseCase,
    private readonly deleteCompanyUseCase: DeleteCompanyUseCase,
  ) {}

  @Get()
  @ResponseMessage('Empresas encontradas com sucesso')
  findAll(@Query() filters: CompanyFilterDto) {
    return this.findAllCompanyUseCase.execute(filters);
  }

  @Get(':uuid')
  @ResponseMessage('Empresa encontrada com sucesso')
  findOne(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.findOneCompanyUseCase.execute(uuid);
  }

  @Post()
  @ResponseMessage('Empresa cadastrada com sucesso')
  create(@Body() dto: CompanyCreateDto, @CurrentUser('id') userId: number) {
    return this.createCompanyUseCase.execute(dto, userId);
  }

  @Patch(':uuid')
  @ResponseMessage('Empresa atualizada com sucesso')
  update(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: CompanyUpdateDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateCompanyUseCase.execute(uuid, dto, userId);
  }

  @Put(':uuid')
  @ResponseMessage('Status da empresa atualizado com sucesso')
  updateStatus(
    @Param('uuid', UuidValidationPipe) uuid: string,
    @Body() dto: ChangeStatusDto,
    @CurrentUser('id') userId: number,
  ) {
    return this.updateCompanyUseCase.updateStatus(uuid, dto, userId);
  }

  @Delete(':uuid')
  @ResponseMessage('Empresa deletada com sucesso')
  delete(@Param('uuid', UuidValidationPipe) uuid: string) {
    return this.deleteCompanyUseCase.execute(uuid);
  }
}
