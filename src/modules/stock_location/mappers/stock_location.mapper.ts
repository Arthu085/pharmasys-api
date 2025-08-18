import { toResponseUserDto } from 'src/modules/users/mappers/user.mapper';
import { StockLocation } from '../entities/stock_location.entity';
import { ResponseStockLocationDto } from '../DTOs/response.stock_location.dto';

export function toResponseStockLocationDto(
  stockLocation: StockLocation,
): ResponseStockLocationDto {
  return {
    id: stockLocation.id,
    name: stockLocation.name,
    code: stockLocation.code,
    is_central_stock: stockLocation.is_central_stock,
    user: stockLocation.user ? toResponseUserDto(stockLocation.user) : null,
    user_id: stockLocation.user_id,
  };
}
