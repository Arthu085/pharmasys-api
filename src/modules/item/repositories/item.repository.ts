import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemEntity } from '../entities/item.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FilterItemDto } from '../DTOs/filter.item.dto';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(ItemEntity)
    private readonly repo: Repository<ItemEntity>,
  ) {}

  findAll(
    filters: FilterItemDto,
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
      const status = StatusEnum[filters.status];
      where.status = status;
    }

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<ItemEntity | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<ItemEntity | null> {
    return this.repo.findOne({ where: { name } });
  }

  create(item: Partial<ItemEntity>): ItemEntity {
    return this.repo.create(item);
  }

  merge(item: ItemEntity, dto: DeepPartial<ItemEntity>): ItemEntity {
    return this.repo.merge(item, dto);
  }

  save(item: ItemEntity): Promise<ItemEntity> {
    return this.repo.save(item);
  }
}
