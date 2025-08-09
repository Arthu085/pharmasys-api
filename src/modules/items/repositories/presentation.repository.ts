import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Presentation } from '../entities/presentation.entity';

@Injectable()
export class PresentationRepository {
  constructor(
    @InjectRepository(Presentation)
    private readonly repo: Repository<Presentation>,
  ) {}

  findByName(name: string): Promise<Presentation | null> {
    return this.repo.findOne({ where: { name } });
  }
}
