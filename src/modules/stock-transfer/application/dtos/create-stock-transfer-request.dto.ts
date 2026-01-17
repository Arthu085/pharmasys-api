import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';

import { StockTransferCreateDto } from './stock-transfer-create.dto';
import { StockTransferItemCreateDto } from './stock-transfer-item-create.dto';

export class CreateStockTransferRequestDto {
  @ValidateNested()
  @Type(() => StockTransferCreateDto)
  transfer: StockTransferCreateDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockTransferItemCreateDto)
  items: StockTransferItemCreateDto[];
}
