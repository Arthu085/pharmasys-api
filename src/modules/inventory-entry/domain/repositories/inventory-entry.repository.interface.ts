import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { InventoryEntryEntity } from '../entities/inventory-entry.entity';
import { InventoryEntryFilterDto } from '../../application/dtos/inventory-entry-filter.dto';

export const IInventoryEntryRepository = Symbol('IInventoryEntryRepository');

export interface IInventoryEntryRepository {
  findAll(
    filters: InventoryEntryFilterDto,
    take: number,
    skip: number,
  ): Promise<[InventoryEntryEntity[], number]>;

  findOne(uuid: UUID): Promise<InventoryEntryEntity | null>;

  create(
    inventoryEntry: Partial<InventoryEntryEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryEntryEntity>;
}
