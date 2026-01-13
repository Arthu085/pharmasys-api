import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IStockTransferRepository } from '../../domain/repositories/stock-transfer.repository.interface';
import { StockTransferFilterDto } from '../dtos/stock-transfer-filter.dto';
import { StockTransferResponseAllDto } from '../dtos/stock-transfer-response-all.dto';

@Injectable()
export class FindAllStockTransferUseCase {
  constructor(
    @Inject(IStockTransferRepository)
    private readonly stockTransferRepository: IStockTransferRepository,
  ) {}

  async execute(
    filters: StockTransferFilterDto,
  ): Promise<IPaginatedResponse<StockTransferResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [stockTransfers, total] = await this.stockTransferRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<StockTransferResponseAllDto>();

    response.data = plainToInstance(
      StockTransferResponseAllDto,
      stockTransfers,
      {
        excludeExtraneousValues: true,
      },
    );
    response.meta = {
      total,
      page,
      limit,
      lastPage,
    };

    return response;
  }
}
