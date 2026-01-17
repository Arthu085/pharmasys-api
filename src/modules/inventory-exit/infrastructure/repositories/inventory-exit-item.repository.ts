import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { IInventoryExitItemRepository } from '../../domain/repositories/inventory-exit-item.repository.interface';
import { InventoryExitItemEntity } from '../../domain/entities/inventory-exit-item.entity';

@Injectable()
export class InventoryExitItemRepository
  implements IInventoryExitItemRepository
{
  constructor(
    @InjectRepository(InventoryExitItemEntity)
    private readonly repo: Repository<InventoryExitItemEntity>,
  ) {}

  create(
    inventoryExitItem: Partial<InventoryExitItemEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryExitItemEntity> {
    const manager = entityManager.getRepository(InventoryExitItemEntity);
    const newInventoryExitItem = manager.create(inventoryExitItem);
    return manager.save(newInventoryExitItem);
  }
}
