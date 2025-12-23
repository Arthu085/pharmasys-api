import { Inject, Injectable } from '@nestjs/common';
import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemFilterDto } from '../dtos/item-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { plainToInstance } from 'class-transformer';
import { PaginatedResponseDto } from 'src/shared/dtos/paginated-response.dto';
import { ItemResponseAllDto } from '../dtos/item-response-all.dto';

@Injectable()
export class FindAllItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(
    filters: ItemFilterDto,
  ): Promise<IPaginatedResponse<ItemResponseAllDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.itemRepository.findAll(
      filters,
      limit,
      skip,
    );

    const lastPage = Math.ceil(total / limit);

    const response = new PaginatedResponseDto<ItemResponseAllDto>();

    response.data = plainToInstance(ItemResponseAllDto, items, {
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
