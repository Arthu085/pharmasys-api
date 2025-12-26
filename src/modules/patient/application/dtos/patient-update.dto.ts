import { PartialType } from '@nestjs/mapped-types';
import { PatientCreateDto } from './patient-create.dto';

export class PatientUpdateDto extends PartialType(PatientCreateDto) {}
