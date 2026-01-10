import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IItemDispensationRepository } from '../../domain/repositories/item-dispensation.repository.interface';
import { ItemDispensationFilterDto } from '../dtos/item-dispensation-filter.dto';
import { ItemDispensationResponseAllDto } from '../dtos/item-dispensation-response-all.dto';

@Injectable()
export class FindAllItemDispensationUseCase {
  constructor(
    @Inject(IItemDispensationRepository)
    private readonly itemDispensationRepository: IItemDispensationRepository,
  ) {}

  async execute(
    filters: ItemDispensationFilterDto,
  ): Promise<IPaginatedResponse<ItemDispensationResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [itemDispensations, total] =
      await this.itemDispensationRepository.findAll(filters, limit, skip);

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<ItemDispensationResponseAllDto>();

    response.data = plainToInstance(
      ItemDispensationResponseAllDto,
      itemDispensations,
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
