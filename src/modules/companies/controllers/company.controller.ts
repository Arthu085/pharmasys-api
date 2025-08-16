import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CompanyService } from '../services/company.service';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/common/enums/role.enum';
import { CreateCompanyRequestDto } from '../DTOs/create.company.request.dto';
import { IsOwnerGuardCompany } from 'src/common/decorators/guards/isownerguard.company.decorator';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  createCompany(
    @Body() createCompanyDto: CreateCompanyRequestDto,
    @User('id') userId: number,
  ) {
    return this.companyService.createCompany(
      createCompanyDto.company,
      createCompanyDto.companyTypeRel,
      userId,
    );
  }

  @UseGuards(JwtAuthGuard, RolesGuard, IsOwnerGuardCompany)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Delete(':id')
  deleteCompany(@Param('id') id: number) {
    return this.companyService.deleteCompany(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  findAllCompanies() {
    return this.companyService.findAllCompanies();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  findCompanyById(@Param('id') id: number) {
    return this.companyService.findCompanyById(id);
  }
}
