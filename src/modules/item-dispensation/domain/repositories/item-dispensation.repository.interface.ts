import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';

import { ItemDispensationEntity } from '../entities/item-dispensation.entity';
import { ItemDispensationFilterDto } from '../../application/dtos/item-dispensation-filter.dto';

export const IItemDispensationRepository = Symbol(
  'IItemDispensationRepository',
);

export interface IItemDispensationRepository {
  findAll(
    filters: ItemDispensationFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemDispensationEntity[], number]>;

  findOne(uuid: UUID): Promise<ItemDispensationEntity | null>;

  create(
    itemDispensation: Partial<ItemDispensationEntity>,
    entityManager: EntityManager,
  ): Promise<ItemDispensationEntity>;
}
