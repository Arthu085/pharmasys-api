import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get()
  @ResponseMessage('Empresas encontradas com sucesso')
  findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.A, RoleEnum.F)
  @Get(':id')
  @ResponseMessage('Empresa encontrada com sucesso')
  findByIdCompany(@Param('id') id: number) {
    return this.companyService.findByIdCompany(id);
  }
}
