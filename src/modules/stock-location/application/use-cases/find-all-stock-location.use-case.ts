import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { IStockLocationRepository } from '../../domain/repositories/stock-location.repository.interface';
import { StockLocationFilterDto } from '../dtos/stock-location-filter.dto';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { StockLocationResponseAllDto } from '../dtos/stock-location-response-all.dto';

@Injectable()
export class FindAllStockLocationUseCase {
  constructor(
    @Inject(IStockLocationRepository)
    private readonly stockLocationRepository: IStockLocationRepository,
  ) {}

  async execute(
    filters: StockLocationFilterDto,
  ): Promise<IPaginatedResponse<StockLocationResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [locations, total] = await this.stockLocationRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<StockLocationResponseAllDto>();

    response.data = plainToInstance(StockLocationResponseAllDto, locations, {
      excludeExtraneousValues: true,
    });
    response.meta = {
      total,
      page,
      limit,
      lastPage,
    };

    return response;
  }
}
