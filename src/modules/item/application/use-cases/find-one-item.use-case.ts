import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { ItemResponseDto } from '../dtos/item-response.dto';
import { plainToInstance } from 'class-transformer';
import { ItemEntity } from '../../domain/entities/item.entity';

@Injectable()
export class FindOneItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async execute(uuid: UUID): Promise<ItemResponseDto> {
    const item = await this.itemRepository.findOne(uuid);
    const validatedItem = this.itemDomainService.validateItem(item);

    return plainToInstance(ItemResponseDto, validatedItem, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne(uuid);

    if (validateActive) {
      return this.itemDomainService.validateItemAndEnsureActive(item);
    }

    return this.itemDomainService.validateItem(item);
  }
}
