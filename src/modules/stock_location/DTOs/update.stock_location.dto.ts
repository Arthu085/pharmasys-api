import { PartialType } from '@nestjs/mapped-types';
import { CreateStockLocationDto } from './create.stock_location.dto';

export class UpdateStockLocationDto extends PartialType(
  CreateStockLocationDto,
) {}
