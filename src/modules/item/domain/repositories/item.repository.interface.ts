import { UpdateResult } from 'typeorm';
import { ItemFilterDto } from '../../application/dtos/item-filter.dto';
import { ItemEntity } from '../entities/item.entity';

export const IItemRepository = Symbol('IItemRepository');

export interface IItemRepository {
  findAll(
    filters: ItemFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemEntity[], number]>;

  findOne(uuid: string): Promise<ItemEntity | null>;

  create(item: Partial<ItemEntity>): Promise<ItemEntity>;

  update(item: ItemEntity): Promise<UpdateResult>;

  softDelete(uuid: string): Promise<UpdateResult>;
}
