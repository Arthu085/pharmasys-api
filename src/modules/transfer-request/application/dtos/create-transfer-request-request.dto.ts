import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { TransferRequestCreateDto } from './transfer-request-create.dto';
import { TransferRequestItemCreateDto } from './transfer-request-item-create.dto';
import { UniqueCompositeArray } from 'src/shared/validation/unique-composite-array.decorator';

export class CreateTransferRequestRequestDto {
  @ValidateNested()
  @Type(() => TransferRequestCreateDto)
  transferRequest: TransferRequestCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @UniqueCompositeArray(['item', 'batch'], {
    message: 'Não é permitido repetir o mesmo item com o mesmo lote',
  })
  @Type(() => TransferRequestItemCreateDto)
  items: TransferRequestItemCreateDto[];
}
