import { EntityManager } from 'typeorm';
import { ItemDispensationItemEntity } from '../entities/item-dispensation-item.entity';

export const IItemDispensationItemRepository = Symbol(
  'ItemDispensationItemRepository',
);

export interface IItemDispensationItemRepository {
  create(
    itemDispensationItem: Partial<ItemDispensationItemEntity>,
    entityManager: EntityManager,
  ): Promise<ItemDispensationItemEntity>;
}
