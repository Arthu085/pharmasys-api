import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { CreateCompanyDto } from '../DTOs/create.company.dto';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateCompanyDto } from '../DTOs/update.company.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterCompanyDto } from '../DTOs/filter.company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get()
  @ResponseMessage('Empresas encontradas com sucesso')
  findAllCompanies(@Query() filters: FilterCompanyDto) {
    return this.companyService.findAllCompanies(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get(':id')
  @ResponseMessage('Empresa encontrada com sucesso')
  findByIdCompany(@Param('id') id: number) {
    return this.companyService.findByIdCompany(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Post()
  @ResponseMessage('Empresa cadastrada com sucesso')
  createCompany(@Body() dto: CreateCompanyDto, @User('id') userId: number) {
    return this.companyService.createCompany(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Patch(':id')
  @ResponseMessage('Empresa atualizada com sucesso')
  updateCompany(
    @Param('id') id: number,
    @Body() dto: UpdateCompanyDto,
    @User('id') userId: number,
  ) {
    return this.companyService.updateCompany(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Put(':id')
  @ResponseMessage('Status da empresa atualizado com sucesso')
  changeStatusCompany(
    @Param('id') id: number,
    @Body() dto: ChangeStatusDto,
    @User('id') userId: number,
  ) {
    return this.companyService.changeStatusCompany(id, dto, userId);
  }
}
