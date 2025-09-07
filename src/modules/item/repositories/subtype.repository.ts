import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtype } from '../entities/subtype.entity';

@Injectable()
export class SubtypeRepository {
  constructor(
    @InjectRepository(Subtype)
    private readonly repo: Repository<Subtype>,
  ) {}

  findByName(name: string): Promise<Subtype | null> {
    return this.repo.findOne({ where: { name } });
  }
}
