import { StockLocation } from '../entities/stock-location.entity';
import { ResponseStockLocationDto } from '../DTOs/response.stock-location.dto';
import { toResponseUserDto } from 'src/modules/user/mappers/user.mapper';

export function toResponseStockLocationDto(
  stockLocation: StockLocation,
): ResponseStockLocationDto {
  const responseDto = new ResponseStockLocationDto();

  responseDto.id = stockLocation.id;
  responseDto.name = stockLocation.name;
  responseDto.code = stockLocation.code;
  responseDto.isCentralStock = stockLocation.isCentralStock;
  responseDto.stockLocationStatus = stockLocation.stockLocationStatus;
  responseDto.createdAt = stockLocation.createdAt;
  responseDto.updatedAt = stockLocation.updatedAt;
  responseDto.userCreated = toResponseUserDto(stockLocation.userCreated);
  responseDto.userUpdated = stockLocation.userUpdated
    ? toResponseUserDto(stockLocation.userUpdated)
    : null;

  return responseDto;
}
