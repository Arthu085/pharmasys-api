import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IEntryItemTypeRepository } from '../../domain/repositories/entry-item-type.repository.interface';
import { EntryItemTypeEntity } from '../../domain/entities/entry-item-type.entity';
import { EntryTypeEnum } from '../../domain/enums/entry-type.enum';

@Injectable()
export class EntryItemTypeRepository implements IEntryItemTypeRepository {
  constructor(
    @InjectRepository(EntryItemTypeEntity)
    private readonly repo: Repository<EntryItemTypeEntity>,
  ) {}

  findByName(name: EntryTypeEnum): Promise<EntryItemTypeEntity | null> {
    return this.repo.findOne({ where: { name: name } });
  }
}
