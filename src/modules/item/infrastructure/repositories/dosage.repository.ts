import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DosageEntity } from '../../domain/entities/dosage.entity';
import { DosageEnum } from '../../domain/enums/dosage.enum';
import { IDosageRepository } from '../../domain/repositories/dosage.repository.interface';

@Injectable()
export class DosageRepository implements IDosageRepository {
  constructor(
    @InjectRepository(DosageEntity)
    private readonly repo: Repository<DosageEntity>,
  ) {}

  findByFormat(format: DosageEnum): Promise<DosageEntity | null> {
    return this.repo.findOne({ where: { format } });
  }
}
