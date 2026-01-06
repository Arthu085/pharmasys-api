import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IInventoryEntryItemRepository } from '../../domain/repositories/inventory-entry-item.repository.interface';
import { InventoryEntryItemEntity } from '../../domain/entities/inventory-entry-item.entity';

@Injectable()
export class InventoryEntryItemRepository
  implements IInventoryEntryItemRepository
{
  constructor(
    @InjectRepository(InventoryEntryItemEntity)
    private readonly repo: Repository<InventoryEntryItemEntity>,
  ) {}

  create(
    inventoryEntryItem: Partial<InventoryEntryItemEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryEntryItemEntity> {
    const manager = entityManager.getRepository(InventoryEntryItemEntity);
    const newInventoryEntryItem = manager.create(inventoryEntryItem);
    return manager.save(newInventoryEntryItem);
  }
}
