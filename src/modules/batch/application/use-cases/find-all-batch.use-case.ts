import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { BatchFilterDto } from '../dtos/batch-filter.dto';
import { BatchResponseAllDto } from '../dtos/batch-response-all.dto';

@Injectable()
export class FindAllBatchUseCase {
  constructor(
    @Inject(IBatchRepository)
    private readonly batchRepository: IBatchRepository,
  ) {}

  async execute(
    filters: BatchFilterDto,
  ): Promise<IPaginatedResponse<BatchResponseAllDto>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [batches, total] = await this.batchRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<BatchResponseAllDto>();

    response.data = plainToInstance(BatchResponseAllDto, batches, {
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
