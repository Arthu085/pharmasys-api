import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubtypeEntity } from '../../domain/entities/subtype.entity';
import { SubtypeEnum } from '../../domain/enums/subtype.enum';
import { ISubtypeRepository } from '../../domain/repositories/subtype.repository.interface';

@Injectable()
export class SubtypeRepository implements ISubtypeRepository {
  constructor(
    @InjectRepository(SubtypeEntity)
    private readonly repo: Repository<SubtypeEntity>,
  ) {}

  findByName(name: SubtypeEnum): Promise<SubtypeEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
