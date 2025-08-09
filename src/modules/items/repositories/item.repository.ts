import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from '../entities/item.entity';
import { Repository } from 'typeorm';
import { ResponseItemDto } from '../DTOs/response.item.dto';
import { toResponseItemDto } from '../mappers/item.mapper';

@Injectable()
export class ItemRepository {
  constructor(
    @InjectRepository(Item)
    private readonly repo: Repository<Item>,
  ) {}

  async findAll(): Promise<ResponseItemDto[]> {
    const result = await this.repo.find();

    return result.map(toResponseItemDto);
  }

  findById(id: number): Promise<Item | null> {
    return this.repo.findOne({ where: { id } });
  }

  findByName(name: string): Promise<Item | null> {
    return this.repo
      .createQueryBuilder('item')
      .where('LOWER(item.name) = LOWER(:name)', { name })
      .getOne();
  }

  create(item: Partial<Item>): Item {
    return this.repo.create(item);
  }

  save(item: Item): Promise<Item> {
    return this.repo.save(item);
  }

  delete(id: number): Promise<void> {
    return this.repo.delete(id).then(() => {});
  }
}
