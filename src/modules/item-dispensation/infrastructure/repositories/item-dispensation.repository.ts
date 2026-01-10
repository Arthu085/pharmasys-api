import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UUID } from 'crypto';
import { EntityManager, FindOptionsWhere, Repository } from 'typeorm';
import { IItemDispensationRepository } from '../../domain/repositories/item-dispensation.repository.interface';
import { ItemDispensationEntity } from '../../domain/entities/item-dispensation.entity';
import { ItemDispensationFilterDto } from '../../application/dtos/item-dispensation-filter.dto';

@Injectable()
export class ItemDispensationRepository implements IItemDispensationRepository {
  constructor(
    @InjectRepository(ItemDispensationEntity)
    private readonly repo: Repository<ItemDispensationEntity>,
  ) {}

  findAll(
    filters: ItemDispensationFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemDispensationEntity[], number]> {
    if (filters.item || filters.batch) {
      return this.findAllWithItemAndBatchFilters(filters, take, skip);
    }

    const where: FindOptionsWhere<ItemDispensationEntity> = {};
    if (filters.dispensationDate) {
      where.dispensationDate = filters.dispensationDate;
    }

    if (filters.patient) {
      where.patient = { uuid: filters.patient };
    }

    if (filters.prescriptor) {
      where.prescriptor = { uuid: filters.prescriptor };
    }

    if (filters.stockLocation) {
      where.stockLocation = { uuid: filters.stockLocation };
    }

    return this.repo.findAndCount({
      where,
      relations: [
        'items.item',
        'items.batch',
        'stockLocation',
        'patient',
        'prescriptor',
      ],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  private async findAllWithItemAndBatchFilters(
    filters: ItemDispensationFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemDispensationEntity[], number]> {
    let query = this.repo
      .createQueryBuilder('ie')
      .leftJoinAndSelect('ie.stockLocation', 'sl')
      .leftJoinAndSelect('ie.userCreated', 'uc')
      .leftJoinAndSelect('ie.items', 'items')
      .leftJoinAndSelect('items.item', 'item')
      .leftJoinAndSelect('items.batch', 'batch');

    if (filters.dispensationDate) {
      query = query.andWhere('ie.dispensationDate = :dispensationDate', {
        dispensationDate: filters.dispensationDate,
      });
    }

    if (filters.patient) {
      query = query.andWhere('sl.uuid = :patient', {
        patient: filters.patient,
      });
    }

    if (filters.prescriptor) {
      query = query.andWhere('sl.uuid = :prescriptor', {
        prescriptor: filters.prescriptor,
      });
    }

    if (filters.stockLocation) {
      query = query.andWhere('sl.uuid = :stockLocation', {
        stockLocation: filters.stockLocation,
      });
    }

    if (filters.item) {
      query = query.andWhere('item.uuid = :item', {
        item: filters.item,
      });
    }

    if (filters.batch) {
      query = query.andWhere('batch.uuid = :batch', {
        batch: filters.batch,
      });
    }

    return query
      .orderBy('ie.id', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();
  }

  findOne(uuid: UUID): Promise<ItemDispensationEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'items',
        'items.item',
        'items.batch',
        'stockLocation',
        'patient',
        'prescriptor',
        'userCreated',
      ],
      withDeleted: false,
    });
  }

  create(
    itemDispensation: Partial<ItemDispensationEntity>,
    entityManager: EntityManager,
  ): Promise<ItemDispensationEntity> {
    const manager = entityManager.getRepository(ItemDispensationEntity);
    const newItemDispensation = manager.create(itemDispensation);
    return manager.save(newItemDispensation);
  }
}
