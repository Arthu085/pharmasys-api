import { EntityManager, UpdateResult } from 'typeorm';

import { TransferRequestItemEntity } from '../entities/transfer-request-item.entity';
import { UUID } from 'crypto';
import { TransferStatusItemEnum } from '../enums/transfer-status-item.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export const ITransferRequestItemRepository = Symbol(
  'TransferRequestItemRepository',
);

export interface ITransferRequestItemRepository {
  findOne(uuid: UUID): Promise<TransferRequestItemEntity | null>;

  create(
    transferRequestItem: Partial<TransferRequestItemEntity>,
    entityManager: EntityManager,
  ): Promise<TransferRequestItemEntity>;

  update(
    uuid: UUID,
    data: Partial<TransferRequestItemEntity>,
  ): Promise<UpdateResult>;

  updateStatus(
    uuid: UUID,
    statusTransferItem: TransferStatusItemEnum,
    userUpdated: UserEntity,
  ): Promise<UpdateResult>;

  softDelete(uuid: UUID, entityManager: EntityManager): Promise<UpdateResult>;
}
