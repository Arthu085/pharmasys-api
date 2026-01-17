import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EntityManager, Repository } from 'typeorm';
import { IInventoryEntryRepository } from '../../domain/repositories/inventory-entry.repository.interface';
import { InventoryEntryEntity } from '../../domain/entities/inventory-entry.entity';
import { InventoryEntryFilterDto } from '../../application/dtos/inventory-entry-filter.dto';

@Injectable()
export class InventoryEntryRepository implements IInventoryEntryRepository {
  constructor(
    @InjectRepository(InventoryEntryEntity)
    private readonly repo: Repository<InventoryEntryEntity>,
  ) {}

  findAll(
    filters: InventoryEntryFilterDto,
    take: number,
    skip: number,
  ): Promise<[InventoryEntryEntity[], number]> {
    let query = this.repo
      .createQueryBuilder('ie')
      .leftJoinAndSelect('ie.stockLocation', 'sl')
      .leftJoinAndSelect('ie.entryType', 'et')
      .leftJoinAndSelect('ie.items', 'items')
      .leftJoinAndSelect('items.item', 'item')
      .leftJoinAndSelect('items.batch', 'batch');

    if (filters.invoiceNumber) {
      query = query.andWhere('ie.invoiceNumber ILIKE :invoiceNumber', {
        invoiceNumber: `%${filters.invoiceNumber}%`,
      });
    }

    if (filters.entryDate) {
      query = query.andWhere('ie.entryDate = :entryDate', {
        entryDate: filters.entryDate,
      });
    }

    if (filters.entryType) {
      query = query.andWhere('et.name = :entryType', {
        entryType: filters.entryType,
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

  findOne(uuid: UUID): Promise<InventoryEntryEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'items',
        'items.item',
        'items.batch',
        'stockLocation',
        'entryType',
        'userCreated',
      ],
      withDeleted: false,
    });
  }

  create(
    inventoryEntry: Partial<InventoryEntryEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryEntryEntity> {
    const manager = entityManager.getRepository(InventoryEntryEntity);
    const newInventoryEntry = manager.create(inventoryEntry);
    return manager.save(newInventoryEntry);
  }
}
