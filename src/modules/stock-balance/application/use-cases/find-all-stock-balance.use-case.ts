import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IStockBalanceRepository } from '../../domain/repositories/stock-balance.repository.interface';
import { StockBalanceFilterDto } from '../dtos/stock-balance-filter.dto';
import { StockBalanceResponseAllDto } from '../dtos/stock-balance-response-all.dto';

@Injectable()
export class FindAllStockBalanceUseCase {
  constructor(
    @Inject(IStockBalanceRepository)
    private readonly stockBalanceRepository: IStockBalanceRepository,
  ) {}

  async execute(
    filters: StockBalanceFilterDto,
  ): Promise<IPaginatedResponse<StockBalanceResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [stockBalances, total] = await this.stockBalanceRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<StockBalanceResponseAllDto>();

    response.data = plainToInstance(StockBalanceResponseAllDto, stockBalances, {
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
