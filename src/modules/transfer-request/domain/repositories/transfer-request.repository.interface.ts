import { UUID } from 'crypto';
import { EntityManager, UpdateResult } from 'typeorm';

import { TransferRequestFilterDto } from '../../application/dtos/transfer-request-filter.dto';
import { TransferRequestEntity } from '../entities/transfer-request.entity';
import { TransferStatusEnum } from '../enums/transfer-status.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

export const ITransferRequestRepository = Symbol('ITransferRequestRepository');

export interface ITransferRequestRepository {
  findAll(
    filters: TransferRequestFilterDto,
    take: number,
    skip: number,
  ): Promise<[TransferRequestEntity[], number]>;

  findOne(uuid: UUID): Promise<TransferRequestEntity | null>;

  create(
    transferRequest: Partial<TransferRequestEntity>,
    entityManager: EntityManager,
  ): Promise<TransferRequestEntity>;

  update(
    uuid: UUID,
    data: Partial<TransferRequestEntity>,
  ): Promise<UpdateResult>;

  updateStatus(
    uuid: UUID,
    statusTransfer: TransferStatusEnum,
    userUpdated: UserEntity,
  ): Promise<UpdateResult>;

  softDelete(uuid: UUID, entityManager: EntityManager): Promise<UpdateResult>;
}
