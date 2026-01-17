import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IItemRepository } from '../../domain/repositories/item.repository.interface';
import { FindOneItemUseCase } from './find-one-item.use-case';

@Injectable()
export class DeleteItemUseCase {
  constructor(
    @Inject(IItemRepository)
    private readonly itemRepository: IItemRepository,
    private readonly findOneItemUseCase: FindOneItemUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneItemUseCase.findEntityByUuid(uuid, false);
    await this.itemRepository.softDelete(uuid);
  }
}
