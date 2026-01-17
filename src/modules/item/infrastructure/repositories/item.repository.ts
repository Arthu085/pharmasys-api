import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhere, ILike, Repository, UpdateResult } from 'typeorm';
import { UUID } from 'crypto';

import { ItemFilterDto } from '../../application/dtos/item-filter.dto';
import { ItemEntity } from '../../domain/entities/item.entity';
import { TypeEnum } from '../../domain/enums/type.enum';
import { PresentationEnum } from '../../domain/enums/presentation.enum';
import { DosageEnum } from '../../domain/enums/dosage.enum';
import { SubtypeEnum } from '../../domain/enums/subtype.enum';
import { IItemRepository } from '../../domain/repositories/item.repository.interface';

@Injectable()
export class ItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repo: Repository<ItemEntity>,
  ) {}

  findAll(
    filters: ItemFilterDto,
    take: number,
    skip: number,
  ): Promise<[ItemEntity[], number]> {
    const where: FindOptionsWhere<ItemEntity> = {};

    if (filters.name) {
      where.name = ILike(`%${filters.name}%`);
    }

    if (filters.type) {
      const typeName = TypeEnum[filters.type];

      where.type = { name: typeName };
    }

    if (filters.presentation) {
      const presentationName = PresentationEnum[filters.presentation];

      where.presentation = { name: presentationName };
    }

    if (filters.dosage) {
      const dosageName = DosageEnum[filters.dosage];

      where.dosage = { format: dosageName };
    }

    if (filters.subtype) {
      const subtypeName = SubtypeEnum[filters.subtype];

      where.subtype = { name: subtypeName };
    }

    if (filters.status) {
      where.status = filters.status;
    }

    return this.repo.findAndCount({
      where,
      relations: ['type', 'presentation', 'dosage', 'subtype'],
      take,
      skip,
      order: { id: 'DESC' },
      withDeleted: false,
    });
  }

  findOne(uuid: UUID): Promise<ItemEntity | null> {
    return this.repo.findOne({
      where: { uuid },
      relations: [
        'type',
        'presentation',
        'dosage',
        'subtype',
        'userCreated',
        'userUpdated',
      ],
      withDeleted: false,
    });
  }

  create(item: Partial<ItemEntity>): Promise<ItemEntity> {
    const newitem = this.repo.create(item);
    return this.repo.save(newitem);
  }

  update(uuid: UUID, data: Partial<ItemEntity>): Promise<UpdateResult> {
    return this.repo.update({ uuid }, data);
  }

  softDelete(uuid: UUID): Promise<UpdateResult> {
    return this.repo.softDelete({ uuid });
  }
}
