import { PartialType } from '@nestjs/mapped-types';
import { PrescriptorCreateDto } from './prescriptor-create.dto';

export class PrescriptorUpdateDto extends PartialType(PrescriptorCreateDto) {}
