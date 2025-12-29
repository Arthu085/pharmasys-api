import { PartialType } from '@nestjs/mapped-types';
import { BatchCreateDto } from './batch-create.dto';

export class BatchUpdateDto extends PartialType(BatchCreateDto) {}
