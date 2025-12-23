import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PresentationEntity } from '../../domain/entities/presentation.entity';
import { PresentationEnum } from '../../domain/enums/presentation.enum';

@Injectable()
export class PresentationRepository {
  constructor(
    @InjectRepository(PresentationEntity)
    private readonly repo: Repository<PresentationEntity>,
  ) {}

  findByName(name: PresentationEnum): Promise<PresentationEntity | null> {
    return this.repo.findOne({ where: { name } });
  }
}
