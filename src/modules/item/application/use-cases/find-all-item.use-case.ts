import { Inject, Injectable } from '@nestjs/common';
import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemFilterDto } from '../dtos/item-filter.dto';
import { IPaginatedResponse } from 'src/shared/interfaces/paginated-response.interface';
import { ItemResponseDto } from '../dtos/item-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FindAllItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
  ) {}

  async execute(
    filters: ItemFilterDto,
  ): Promise<IPaginatedResponse<ItemResponseDto | null>> {
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const skip = (page - 1) * limit;

    const [items, total] = await this.itemRepository.findAll(
      filters,
      limit,
      skip,
    );

    const data = plainToInstance(ItemResponseDto, items, {
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
