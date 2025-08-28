import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { DeepPartial, Repository } from 'typeorm';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  findAll(): Promise<Item[]> {
    return this.repo.find();
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
