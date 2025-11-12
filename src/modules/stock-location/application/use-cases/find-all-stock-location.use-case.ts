import { Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { StockLocationRepository } from '../../infrastructure/repositories/stock-location.repository';
import { StockLocationFilterDto } from '../dtos/stock-location-filter.dto';
import { plainToInstance } from 'class-transformer';
import { StockLocationResponseDto } from '../dtos/stock-location-response.dto';

@Injectable()
export class FindAllStockLocationUseCase {
  constructor(
    private readonly stockLocationRepository: StockLocationRepository,
  ) {}

  async execute(
    filters: StockLocationFilterDto,
  ): Promise<IPaginatedResponse<StockLocationResponseDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [locations, total] = await this.stockLocationRepository.findAll(
      filters,
      limit,
      skip,
    );

    const data = plainToInstance(StockLocationResponseDto, locations, {
      excludeExtraneousValues: true,
    });

    const lastPage = Math.ceil(total / limit);

    return {
      data,
      meta: {
        total,
        page,
        limit,
        lastPage,
      },
    };
  }
}
