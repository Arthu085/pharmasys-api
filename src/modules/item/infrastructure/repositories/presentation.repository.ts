import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresentationEntity } from '../../domain/entities/presentation.entity';
import { PresentationEnum } from '../../domain/enums/presentation.enum';
import { IPresentationRepository } from '../../domain/repositories/presentation.repository.interface';

@Injectable()
export class PresentationRepository implements IPresentationRepository {
  constructor(
    @InjectRepository(PresentationEntity)
    private readonly repo: Repository<PresentationEntity>,
  ) {}

  findByName(name: PresentationEnum): Promise<PresentationEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
