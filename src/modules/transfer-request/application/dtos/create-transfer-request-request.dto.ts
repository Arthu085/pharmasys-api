import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { TransferRequestCreateDto } from './transfer-request-create.dto';
import { TransferRequestItemCreateDto } from './transfer-request-item-create.dto';

export class CreateTransferRequestRequestDto {
  @ValidateNested()
  @Type(() => TransferRequestCreateDto)
  transferRequest: TransferRequestCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TransferRequestItemCreateDto)
  items: TransferRequestItemCreateDto[];
}
