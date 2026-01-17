import { PartialType, OmitType } from '@nestjs/mapped-types';
import { StockBalanceCreateDto } from './stock-balance-create.dto';

export class StockBalanceUpdateDto extends PartialType(
  OmitType(StockBalanceCreateDto, ['item', 'batch'] as const),
) {}
