import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EntityManager, Repository } from 'typeorm';
import { IInventoryExitRepository } from '../../domain/repositories/inventory-exit.repository.interface';
import { InventoryExitEntity } from '../../domain/entities/inventory-exit.entity';
import { InventoryExitFilterDto } from '../../application/dtos/inventory-exit-filter.dto';

@Injectable()
export class InventoryExitRepository implements IInventoryExitRepository {
  constructor(
    @InjectRepository(InventoryExitEntity)
    private readonly repo: Repository<InventoryExitEntity>,
  ) {}

  findAll(
    filters: InventoryExitFilterDto,
    take: number,
    skip: number,
  ): Promise<[InventoryExitEntity[], number]> {
    let query = this.repo
      .createQueryBuilder('ie')
      .leftJoinAndSelect('ie.stockLocation', 'sl')
      .leftJoinAndSelect('ie.exitType', 'et')
      .leftJoinAndSelect('ie.items', 'items')
      .leftJoinAndSelect('items.item', 'item')
      .leftJoinAndSelect('items.batch', 'batch');

    if (filters.exitDate) {
      query = query.andWhere('ie.exitDate = :exitDate', {
        exitDate: filters.exitDate,
      });
    }

    if (filters.exitType) {
      query = query.andWhere('et.name = :exitType', {
        exitType: filters.exitType,
      });
    }

    if (filters.stockLocation) {
      query = query.andWhere('sl.uuid = :stockLocation', {
        stockLocation: filters.stockLocation,
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

  findOne(uuid: UUID): Promise<InventoryExitEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'items',
        'items.item',
        'items.batch',
        'stockLocation',
        'exitType',
        'userCreated',
      ],
      withDeleted: false,
    });
  }

  create(
    inventoryExit: Partial<InventoryExitEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryExitEntity> {
    const manager = entityManager.getRepository(InventoryExitEntity);
    const newInventoryExit = manager.create(inventoryExit);
    return manager.save(newInventoryExit);
  }
}
