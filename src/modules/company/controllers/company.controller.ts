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
import { JwtAuthGuard, RolesGuard } from 'src/core/guards';
import { Roles, ResponseMessage, User } from 'src/core/decorators';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { CreateCompanyDto } from '../DTOs/create.company.dto';
import { UpdateCompanyDto } from '../DTOs/update.company.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';
import { FilterCompanyDto } from '../DTOs/filter.company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  @ResponseMessage('Empresas encontradas com sucesso')
  findAllCompanies(@Query() filters: FilterCompanyDto) {
    return this.companyService.findAllCompanies(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  @ResponseMessage('Empresa encontrada com sucesso')
  findByIdCompany(@Param('id') id: number) {
    return this.companyService.findByIdCompany(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  @ResponseMessage('Empresa cadastrada com sucesso')
  createCompany(@Body() dto: CreateCompanyDto, @User('id') userId: number) {
    return this.companyService.createCompany(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
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
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
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
