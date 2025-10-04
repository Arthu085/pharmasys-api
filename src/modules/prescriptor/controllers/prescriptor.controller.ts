import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PrescriptorService } from '../services/prescriptor.service';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';
import { createPrescriptorDto } from '../DTOs/create-prescriptor.dto';
import { User } from 'src/common/decorators/user.decorator';

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
    @Body() dto: createPrescriptorDto,
    @User('id') userId: number,
  ) {
    return this.prescriptorService.createPrescriptor(dto, userId);
  }
}
