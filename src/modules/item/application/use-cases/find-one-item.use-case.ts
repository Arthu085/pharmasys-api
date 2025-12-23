import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { ItemDomainService } from '../../domain/services/item-domain.service';
import { plainToInstance } from 'class-transformer';
import { ItemEntity } from '../../domain/entities/item.entity';
import { ItemResponseOneDto } from '../dtos/item-response-one.dto';

@Injectable()
export class FindOneItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly itemDomainService: ItemDomainService,
  ) {}

  async execute(uuid: UUID): Promise<ItemResponseOneDto> {
    const item = await this.itemRepository.findOne(uuid);
    this.itemDomainService.validateItemAndEnsureActive(item);

    return plainToInstance(ItemResponseOneDto, item, {
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
