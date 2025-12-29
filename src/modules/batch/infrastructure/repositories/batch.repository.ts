import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { IBatchRepository } from '../../domain/repositories/batch.repository.interface';
import { BatchEntity } from '../../domain/entities/batch.entity';
import { BatchFilterDto } from '../../application/dtos/batch-filter.dto';

@Injectable()
export class BatchRepository implements IBatchRepository {
  constructor(
    @InjectRepository(BatchEntity)
    private readonly repo: Repository<BatchEntity>,
  ) {}

  findAll(
    filters: BatchFilterDto,
    take: number,
    skip: number,
  ): Promise<[BatchEntity[], number]> {
    const where: FindOptionsWhere<BatchEntity> = {};
    if (filters.batchCode) {
      where.batchCode = ILike(`%${filters.batchCode}%`);
    }

    if (filters.item) {
      where.item = { uuid: filters.item };
    }

    if (filters.company) {
      where.company = { uuid: filters.company };
    }

    if (filters.expirationDate) {
      where.expirationDate = filters.expirationDate;
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      relations: ['item', 'company'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<BatchEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: ['item', 'company', 'userCreated', 'userUpdated'],
      withDeleted: false,
    });
  }

  findByCode(batchCode: string): Promise<BatchEntity | null> {
    return this.repo.findOne({
      where: { batchCode },
      withDeleted: false,
    });
  }

  create(batch: Partial<BatchEntity>): Promise<BatchEntity> {
    const newBatch = this.repo.create(batch);
    return this.repo.save(newBatch);
  }

  update(uuid: UUID, data: Partial<BatchEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
