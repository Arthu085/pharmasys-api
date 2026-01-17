import { PartialType } from '@nestjs/mapped-types';
import { TransferRequestCreateDto } from './transfer-request-create.dto';

export class TransferRequestUpdateDto extends PartialType(
  TransferRequestCreateDto,
) {}
