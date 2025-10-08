import { PartialType } from '@nestjs/mapped-types';
import { CreatePrescriptorDto } from './create.prescriptor.dto';

export class UpdatePrescriptorDto extends PartialType(CreatePrescriptorDto) {}
