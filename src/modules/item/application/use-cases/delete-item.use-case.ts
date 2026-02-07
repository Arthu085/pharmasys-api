import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { FindOneItemUseCase } from './find-one-item.use-case';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { ItemEntity } from '../../domain/entities/item.entity';

@Injectable()
export class DeleteItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneItemUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(ItemEntity, uuid, 'Item');
    await this.itemRepository.softDelete(uuid);
  }
}
