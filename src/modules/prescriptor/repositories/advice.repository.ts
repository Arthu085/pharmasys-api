import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Advice } from '../entities/advice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdviceRepository {
  constructor(
    @InjectRepository(Advice)
    private readonly repo: Repository<Advice>,
  ) {}

  findByAcronym(acronym: string): Promise<Advice | null> {
    return this.repo.findOne({ where: { acronym: acronym } });
  }
}
