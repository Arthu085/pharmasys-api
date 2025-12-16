import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubtypeEntity } from '../../domain/entities/subtype.entity';

@Injectable()
export class SubtypeRepository {
  constructor(
    @InjectRepository(SubtypeEntity)
    private readonly repo: Repository<SubtypeEntity>,
  ) {}

  findByName(name: string): Promise<SubtypeEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
