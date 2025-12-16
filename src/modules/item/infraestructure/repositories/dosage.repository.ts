import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DosageEntity } from '../../domain/entities/dosage.entity';

@Injectable()
export class DosageRepository {
  constructor(
    @InjectRepository(DosageEntity)
    private readonly repo: Repository<DosageEntity>,
  ) {}

  findByFormat(format: string): Promise<DosageEntity | null> {
    return this.repo.findOne({ where: { format } });
  }
}
