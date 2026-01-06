import { Inject, Injectable } from '@nestjs/common';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';

import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { IInventoryEntryRepository } from '../../domain/repositories/inventory-entry.repository.interface';
import { InventoryEntryFilterDto } from '../dtos/inventory-entry-filter.dto';
import { InventoryEntryResponseAllDto } from '../dtos/inventory-entry-response-all.dto';

@Injectable()
export class FindAllInventoryEntryUseCase {
  constructor(
    @Inject(IInventoryEntryRepository)
    private readonly inventoryEntryRepository: IInventoryEntryRepository,
  ) {}

  async execute(
    filters: InventoryEntryFilterDto,
  ): Promise<IPaginatedResponse<InventoryEntryResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [inventoryEntries, total] =
      await this.inventoryEntryRepository.findAll(filters, limit, skip);

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<InventoryEntryResponseAllDto>();

    response.data = plainToInstance(
      InventoryEntryResponseAllDto,
      inventoryEntries,
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
