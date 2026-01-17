import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository, UpdateResult } from 'typeorm';

import { ITransferRequestItemRepository } from '../../domain/repositories/transfer-request-item.repository.interface';
import { TransferRequestItemEntity } from '../../domain/entities/transfer-request-item.entity';
import { UUID } from 'crypto';
import { TransferStatusItemEnum } from '../../domain/enums/transfer-status-item.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Injectable()
export class TransferRequestItemRepository
  implements ITransferRequestItemRepository
{
  constructor(
    @InjectRepository(TransferRequestItemEntity)
    private readonly repo: Repository<TransferRequestItemEntity>,
  ) {}

  findOne(uuid: UUID): Promise<TransferRequestItemEntity | null> {
    return this.repo.findOneBy({ uuid });
  }

  create(
    transferRequestItem: Partial<TransferRequestItemEntity>,
    entityManager: EntityManager,
  ): Promise<TransferRequestItemEntity> {
    const manager = entityManager.getRepository(TransferRequestItemEntity);
    const newTransferRequestItem = manager.create(transferRequestItem);
    return manager.save(newTransferRequestItem);
  }

  update(
    uuid: UUID,
    data: Partial<TransferRequestItemEntity>,
  ): Promise<UpdateResult> {
    const { transferRequest, item, batch, ...updateData } = data;
    return this.repo.update({ uuid }, updateData);
  }

  updateStatus(
    uuid: UUID,
    statusTransferItem: TransferStatusItemEnum,
    userUpdated: UserEntity,
  ): Promise<UpdateResult> {
    return this.repo.update(
      { uuid },
      {
        statusTransferItem,
        userUpdated,
      },
    );
  }

  softDelete(uuid: UUID, entityManager: EntityManager): Promise<UpdateResult> {
    const manager = entityManager.getRepository(TransferRequestItemEntity);
    return manager.softDelete({ uuid });
  }
}
