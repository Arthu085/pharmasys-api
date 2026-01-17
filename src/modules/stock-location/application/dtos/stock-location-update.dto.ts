import { PartialType } from '@nestjs/mapped-types';
import { StockLocationCreateDto } from './stock-location-create.dto';

export class StockLocationUpdateDto extends PartialType(
  StockLocationCreateDto,
) {}
