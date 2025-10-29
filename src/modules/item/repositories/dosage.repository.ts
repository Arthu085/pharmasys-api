import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DosageEntity } from '../entities/dosage.entity';
import { Repository } from 'typeorm';

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
