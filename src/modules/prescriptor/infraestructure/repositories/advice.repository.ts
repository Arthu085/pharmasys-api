import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AdviceEntity } from '../../domain/entities/advice.entity';
import { Repository } from 'typeorm';
import { IAdviceRepository } from '../../domain/repositories/advice.repository.interface';

@Injectable()
export class AdviceRepository implements IAdviceRepository {
  constructor(
    @InjectRepository(AdviceEntity)
    private readonly repo: Repository<AdviceEntity>,
  ) {}

  findByAcronym(acronym: string): Promise<AdviceEntity | null> {
    return this.repo.findOne({ where: { acronym: acronym } });
  }
}
