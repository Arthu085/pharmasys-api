import { EntityManager } from 'typeorm';
import { InventoryEntryItemEntity } from '../entities/inventory-entry-item.entity';

export const IInventoryEntryItemRepository = Symbol(
  'IInventoryEntryItemRepository',
);

export interface IInventoryEntryItemRepository {
  create(
    inventoryEntryItem: Partial<InventoryEntryItemEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryEntryItemEntity>;
}
