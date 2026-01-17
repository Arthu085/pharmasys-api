import { PartialType } from '@nestjs/mapped-types';
import { TransferRequestItemCreateDto } from './transfer-request-item-create.dto';

export class TransferRequestItemUpdateDto extends PartialType(
  TransferRequestItemCreateDto,
) {}
