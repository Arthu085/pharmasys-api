import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { ItemFilterDto } from '../../application/dtos/item-filter.dto';
import { ItemEntity } from '../entities/item.entity';

export const IItemRepository = Symbol('IItemRepository');

export interface IItemRepository {
  findAll(
    filters: ItemFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemEntity[], number]>;

  findOne(uuid: UUID): Promise<ItemEntity | null>;

  create(item: Partial<ItemEntity>): Promise<ItemEntity>;

  update(uuid: UUID, data: Partial<ItemEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
