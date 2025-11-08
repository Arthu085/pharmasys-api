// import {
//   Body,
//   Controller,
//   Get,
//   Param,
//   Patch,
//   Post,
//   Put,
//   Query,
//   UseGuards,
// } from '@nestjs/common';
// import { PrescriptorService } from '../services/prescriptor.service';
// import { JwtAuthGuard, RolesGuard, Roles, CurrentUser } from 'src/modules/auth';
// import { ResponseMessage } from 'src/core';
// import { RoleEnum } from 'src/shared/enums/role.enum';
// import { FilterPrescriptorDto } from '../DTOs/filter.prescriptor.dto';
// import { CreatePrescriptorDto } from '../DTOs/create.prescriptor.dto';
// import { UpdatePrescriptorDto } from '../DTOs/update.prescriptor.dto';
// import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';

// @Controller('prescriptor')
// export class PrescriptorController {
//   constructor(private readonly prescriptorService: PrescriptorService) {}

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
//   @Get()
//   @ResponseMessage('Prescritores encontrados com sucesso')
//   findAllPrescriptors(@Query() filters: FilterPrescriptorDto) {
//     return this.prescriptorService.findAllPrescriptors(filters);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
//   @Get(':id')
//   @ResponseMessage('Prescritor encontrado com sucesso')
//   findByIdPrescriptor(@Param('id') id: number) {
//     return this.prescriptorService.findByIdPrescriptor(id);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
//   @Post()
//   @ResponseMessage('Prescritor cadastrado com sucesso')
//   createPrescriptor(
//     @Body() dto: CreatePrescriptorDto,
//     @CurrentUser('id') userId: number,
//   ) {
//     return this.prescriptorService.createPrescriptor(dto, userId);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
//   @Patch(':id')
//   @ResponseMessage('Prescritor atualizado com sucesso')
//   updatePrescriptor(
//     @Body() dto: UpdatePrescriptorDto,
//     @CurrentUser('id') userId: number,
//     @Param('id') id: number,
//   ) {
//     return this.prescriptorService.updatePrescriptor(id, dto, userId);
//   }

//   @UseGuards(JwtAuthGuard, RolesGuard)
//   @Roles(RoleEnum.ADMIN, RoleEnum.FARMACEUTICO)
//   @Put(':id')
//   @ResponseMessage('Status do prescritor atualizado com sucesso')
//   changeStatusPrescriptor(
//     @Param('id') id: number,
//     @Body() dto: ChangeStatusDto,
//     @CurrentUser('id') userId: number,
//   ) {
//     return this.prescriptorService.changeStatusPrescriptor(id, dto, userId);
//   }
// }
