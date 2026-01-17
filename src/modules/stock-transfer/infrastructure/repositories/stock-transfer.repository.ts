import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EntityManager, Repository } from 'typeorm';
import { IStockTransferRepository } from '../../domain/repositories/stock-transfer.repository.interface';
import { StockTransferEntity } from '../../domain/entities/stock-transfer.entity';
import { StockTransferFilterDto } from '../../application/dtos/stock-transfer-filter.dto';

@Injectable()
export class StockTransferRepository implements IStockTransferRepository {
  constructor(
    @InjectRepository(StockTransferEntity)
    private readonly repo: Repository<StockTransferEntity>,
  ) {}

  findAll(
    filters: StockTransferFilterDto,
    take: number,
    skip: number,
  ): Promise<[StockTransferEntity[], number]> {
    let query = this.repo
      .createQueryBuilder('ie')
      .leftJoinAndSelect('ie.origin', 'sl')
      .leftJoinAndSelect('ie.destination', 'dl')
      .leftJoinAndSelect('ie.items', 'items')
      .leftJoinAndSelect('items.item', 'item')
      .leftJoinAndSelect('items.batch', 'batch');

    if (filters.transferDate) {
      query = query.andWhere('ie.transferDate = :transferDate', {
        transferDate: filters.transferDate,
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

  findOne(uuid: UUID): Promise<StockTransferEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'items.item',
        'items.batch',
        'origin',
        'destination',
        'userCreated',
      ],
      withDeleted: false,
    });
  }

  create(
    stockTransfer: Partial<StockTransferEntity>,
    entityManager: EntityManager,
  ): Promise<StockTransferEntity> {
    const manager = entityManager.getRepository(StockTransferEntity);
    const newStockTransfer = manager.create(stockTransfer);
    return manager.save(newStockTransfer);
  }
}
