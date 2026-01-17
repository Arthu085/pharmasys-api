import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IInventoryExitRepository } from '../../domain/repositories/inventory-exit.repository.interface';
import { InventoryExitFilterDto } from '../dtos/inventory-exit-filter.dto';
import { InventoryExitResponseAllDto } from '../dtos/inventory-exit-response-all.dto';

@Injectable()
export class FindAllInventoryExitUseCase {
  constructor(
    @Inject(IInventoryExitRepository)
    private readonly inventoryExitRepository: IInventoryExitRepository,
  ) {}

  async execute(
    filters: InventoryExitFilterDto,
  ): Promise<IPaginatedResponse<InventoryExitResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [inventoryExits, total] = await this.inventoryExitRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<InventoryExitResponseAllDto>();

    response.data = plainToInstance(
      InventoryExitResponseAllDto,
      inventoryExits,
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
