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
import { PrescriptorService } from '../services/prescriptor.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/core/decorators/role.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/core/decorators/response-message.decorator';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';
import { User } from 'src/core/decorators/user.decorator';
import { CreatePrescriptorDto } from '../DTOs/create.prescriptor.dto';
import { UpdatePrescriptorDto } from '../DTOs/update.prescriptor.dto';
import { ChangeStatusDto } from 'src/shared/DTOs/change-status.dto';

@Controller('prescriptor')
export class PrescriptorController {
  constructor(private readonly prescriptorService: PrescriptorService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get()
  @ResponseMessage('Prescritores encontrados com sucesso')
  findAllPrescriptors(@Query() filters: FilterPrescriptorDto) {
    return this.prescriptorService.findAllPrescriptors(filters);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Get(':id')
  @ResponseMessage('Prescritor encontrado com sucesso')
  findByIdPrescriptor(@Param('id') id: number) {
    return this.prescriptorService.findByIdPrescriptor(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Post()
  @ResponseMessage('Prescritor cadastrado com sucesso')
  createPrescriptor(
    @Body() dto: CreatePrescriptorDto,
    @User('id') userId: number,
  ) {
    return this.prescriptorService.createPrescriptor(dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Patch(':id')
  @ResponseMessage('Prescritor atualizado com sucesso')
  updatePrescriptor(
    @Body() dto: UpdatePrescriptorDto,
    @User('id') userId: number,
    @Param('id') id: number,
  ) {
    return this.prescriptorService.updatePrescriptor(id, dto, userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
  @Put(':id')
  @ResponseMessage('Status do prescritor atualizado com sucesso')
  changeStatusPrescriptor(
    @Param('id') id: number,
    @Body() dto: ChangeStatusDto,
    @User('id') userId: number,
  ) {
    return this.prescriptorService.changeStatusPrescriptor(id, dto, userId);
  }
}
