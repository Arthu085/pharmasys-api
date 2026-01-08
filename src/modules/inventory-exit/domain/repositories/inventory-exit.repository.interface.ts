import { UUID } from 'crypto';
import { EntityManager } from 'typeorm';
import { InventoryExitEntity } from '../entities/inventory-exit.entity';
import { InventoryExitFilterDto } from '../../application/dtos/inventory-exit-filter.dto';

export const IInventoryExitRepository = Symbol('IInventoryExitRepository');

export interface IInventoryExitRepository {
  findAll(
    filters: InventoryExitFilterDto,
    take: number,
    skip: number,
  ): Promise<[InventoryExitEntity[], number]>;

  findOne(uuid: UUID): Promise<InventoryExitEntity | null>;

  create(
    inventoryExit: Partial<InventoryExitEntity>,
    entityManager: EntityManager,
  ): Promise<InventoryExitEntity>;
}
