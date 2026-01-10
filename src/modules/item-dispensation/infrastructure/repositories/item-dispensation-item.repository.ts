import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { IItemDispensationItemRepository } from '../../domain/repositories/item-dispensation-item.repository.interface';
import { ItemDispensationItemEntity } from '../../domain/entities/item-dispensation-item.entity';

@Injectable()
export class ItemDispensationItemRepository
  implements IItemDispensationItemRepository
{
  constructor(
    @InjectRepository(ItemDispensationItemEntity)
    private readonly repo: Repository<ItemDispensationItemEntity>,
  ) {}

  create(
    itemDispensationItem: Partial<ItemDispensationItemEntity>,
    entityManager: EntityManager,
  ): Promise<ItemDispensationItemEntity> {
    const manager = entityManager.getRepository(ItemDispensationItemEntity);
    const newItemDispensationItem = manager.create(itemDispensationItem);
    return manager.save(newItemDispensationItem);
  }
}
