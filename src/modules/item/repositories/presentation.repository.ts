import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresentationEntity } from '../entities/presentation.entity';

@Injectable()
export class PresentationRepository {
  constructor(
    @InjectRepository(PresentationEntity)
    private readonly repo: Repository<PresentationEntity>,
  ) {}

  findByName(name: string): Promise<PresentationEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
