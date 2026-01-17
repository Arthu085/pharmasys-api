import { EntityManager } from 'typeorm';
import { InventoryExitItemEntity } from '../entities/inventory-exit-item.entity';

export const IInventoryExitItemRepository = Symbol(
  'IInventoryExitItemRepository',
);

export interface IInventoryExitItemRepository {
  create(
    inventoryExitItem: Partial<InventoryExitItemEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryExitItemEntity>;
}
