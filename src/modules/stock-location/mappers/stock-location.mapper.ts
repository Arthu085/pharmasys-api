// import { StockLocationEntity } from '../entities/stock-location.entity';
// import { ResponseStockLocationDto } from '../DTOs/response.stock-location.dto';
// import { toResponseUserDto } from 'src/modules/user/mappers/user.mapper';

// export function toResponseStockLocationDto(
//   stockLocation: StockLocationEntity,
// ): ResponseStockLocationDto {
//   const responseDto = new ResponseStockLocationDto();

//   responseDto.id = stockLocation.id;
//   responseDto.name = stockLocation.name;
//   responseDto.code = stockLocation.code;
//   responseDto.isCentralStock = stockLocation.isCentralStock;
//   responseDto.status = stockLocation.status;
//   responseDto.createdAt = stockLocation.createdAt;
//   responseDto.updatedAt = stockLocation.updatedAt;
//   responseDto.userCreated = stockLocation.userCreated
//     ? toResponseUserDto(stockLocation.userCreated)
//     : null;
//   responseDto.userUpdated = stockLocation.userUpdated
//     ? toResponseUserDto(stockLocation.userUpdated)
//     : null;

//   return responseDto;
// }
