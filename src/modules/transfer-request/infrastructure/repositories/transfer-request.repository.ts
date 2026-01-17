import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EntityManager, Repository, UpdateResult } from 'typeorm';
import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { TransferRequestEntity } from '../../domain/entities/transfer-request.entity';
import { TransferRequestFilterDto } from '../../application/dtos/transfer-request-filter.dto';
import { TransferReasonEnum } from '../../domain/enums/transfer-reason.enum';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Injectable()
export class TransferRequestRepository implements ITransferRequestRepository {
  constructor(
    @InjectRepository(TransferRequestEntity)
    private readonly repo: Repository<TransferRequestEntity>,
  ) {}

  findAll(
    filters: TransferRequestFilterDto,
    take: number,
    skip: number,
  ): Promise<[TransferRequestEntity[], number]> {
    let query = this.repo
      .createQueryBuilder('ie')
      .leftJoinAndSelect('ie.origin', 'sl')
      .leftJoinAndSelect('ie.destination', 'dl')
      .leftJoinAndSelect('ie.reason', 'r')
      .leftJoinAndSelect('ie.items', 'items')
      .leftJoinAndSelect('items.item', 'item')
      .leftJoinAndSelect('items.batch', 'batch');

    if (filters.requestDate) {
      query = query.andWhere('ie.requestDate = :requestDate', {
        requestDate: filters.requestDate,
      });
    }

    if (filters.origin) {
      query = query.andWhere('sl.uuid = :origin', {
        origin: filters.origin,
      });
    }

    if (filters.destination) {
      query = query.andWhere('dl.uuid = :destination', {
        destination: filters.destination,
      });
    }

    if (filters.reason) {
      const reason = TransferReasonEnum[filters.reason];
      query = query.andWhere('r.name = :reason', {
        reason,
      });
    }

    if (filters.statusTransfer) {
      query = query.andWhere('ie.statusTransfer = :statusTransfer', {
        statusTransfer: filters.statusTransfer,
      });
    }

    if (filters.item) {
      query = query.andWhere('item.uuid = :item', {
        item: filters.item,
      });
    }

    if (filters.batch) {
      query = query.andWhere('batch.uuid = :batch', {
        batch: filters.batch,
      });
    }

    return query
      .andWhere('ie.deletedAt IS NULL')
      .orderBy('ie.id', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }

  findOne(uuid: UUID): Promise<TransferRequestEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'items.item',
        'items.batch',
        'origin',
        'destination',
        'reason',
        'userCreated',
      ],
      withDeleted: false,
    });
  }

  create(
    transferRequest: Partial<TransferRequestEntity>,
    entityManager: EntityManager,
  ): Promise<TransferRequestEntity> {
    const manager = entityManager.getRepository(TransferRequestEntity);
    const newTransferRequest = manager.create(transferRequest);
    return manager.save(newTransferRequest);
  }

  update(
    uuid: UUID,
    data: Partial<TransferRequestEntity>,
  ): Promise<UpdateResult> {
    const { items, ...updateData } = data;
    return this.repo.update({ uuid }, updateData);
  }

  updateStatus(
    uuid: UUID,
    statusTransfer: TransferStatusEnum,
    userUpdated: UserEntity,
  ): Promise<UpdateResult> {
    return this.repo.update(
      { uuid },
      {
        statusTransfer,
        userUpdated,
      },
    );
  }

  softDelete(uuid: UUID, entityManager: EntityManager): Promise<UpdateResult> {
    const manager = entityManager.getRepository(TransferRequestEntity);
    return manager.softDelete({ uuid });
  }
}
