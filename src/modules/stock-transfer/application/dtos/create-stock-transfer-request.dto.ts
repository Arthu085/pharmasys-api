import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { StockTransferCreateDto } from './stock-transfer-create.dto';
import { StockTransferItemCreateDto } from './stock-transfer-item-create.dto';
import { UniqueCompositeArray } from 'src/shared/validation/unique-composite-array.decorator';

export class CreateStockTransferRequestDto {
  @ValidateNested()
  @Type(() => StockTransferCreateDto)
  transfer: StockTransferCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @UniqueCompositeArray(['item', 'batch'], {
    message: 'Não é permitido repetir o mesmo item com o mesmo lote',
  })
  @Type(() => StockTransferItemCreateDto)
  items: StockTransferItemCreateDto[];
}
