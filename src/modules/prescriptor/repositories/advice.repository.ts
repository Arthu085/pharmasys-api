import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdviceEntity } from '../entities/advice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdviceRepository {
  constructor(
    @InjectRepository(AdviceEntity)
    private readonly repo: Repository<AdviceEntity>,
  ) {}

  findByAcronym(acronym: string): Promise<AdviceEntity | null> {
    return this.repo.findOne({ where: { acronym: acronym } });
  }
}
