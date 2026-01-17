import { Inject, Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { ITransferRequestItemRepository } from '../../domain/repositories/transfer-request-item.repository.interface';
import { TransferRequestItemEntity } from '../../domain/entities/transfer-request-item.entity';

@Injectable()
export class DeleteTransferRequestItemUseCase {
  constructor(
    @Inject(ITransferRequestItemRepository)
    private readonly transferRequestItemRepository: ITransferRequestItemRepository,
  ) {}

  async execute(
    transferRequestItems: TransferRequestItemEntity[],
    entityManager: EntityManager,
  ): Promise<void> {
    for (const item of transferRequestItems) {
      await this.transferRequestItemRepository.softDelete(
        item.uuid,
        entityManager,
      );
    }
  }
}
