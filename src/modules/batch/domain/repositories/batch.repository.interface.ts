import { UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { BatchEntity } from '../entities/batch.entity';
import { BatchFilterDto } from '../../application/dtos/batch-filter.dto';

export const IBatchRepository = Symbol('IBatchRepository');

export interface IBatchRepository {
  findAll(
    filters: BatchFilterDto,
    take: number,
    skip: number,
  ): Promise<[BatchEntity[], number]>;

  findOne(uuid: UUID): Promise<BatchEntity | null>;

  findByCode(batchCode: string): Promise<BatchEntity | null>;

  create(batch: Partial<BatchEntity>): Promise<BatchEntity>;

  update(uuid: UUID, data: Partial<BatchEntity>): Promise<UpdateResult>;

  softDelete(uuid: UUID): Promise<UpdateResult>;
}
