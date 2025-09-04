import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { DeepPartial, FindOptionsWhere, ILike, Repository } from 'typeorm';
import { FilterItemDto } from '../DTOs/filter.item.dto';
import { TypeEnum } from '../enums/type.enum';
import { PresentationEnum } from '../enums/presentation.enum';
import { DosageEnum } from '../enums/dosage.enum';
import { SubtypeEnum } from '../enums/subtype.enum';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  findAll(
    filters: FilterItemDto,
    take: number,
    skip: number,
  ): Promise<[Item[], number]> {
    const where: FindOptionsWhere<Item> = {};

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

    return this.repo.findAndCount({ where, take, skip });
  }

  findById(id: number): Promise<Item | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<Item | null> {
    return this.repo.findOne({ where: { name } });
  }

  create(item: Partial<Item>): Item {
    return this.repo.create(item);
  }

  merge(item: Item, dto: DeepPartial<Item>): Item {
    return this.repo.merge(item, dto);
  }

  save(item: Item): Promise<Item> {
    return this.repo.save(item);
  }
}
