import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Dosage } from '../entities/dosage.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DosageRepository {
  constructor(
    @InjectRepository(Dosage)
    private readonly repo: Repository<Dosage>,
  ) {}

  findByFormat(format: string): Promise<Dosage | null> {
    return this.repo.findOne({ where: { format } });
  }
}
