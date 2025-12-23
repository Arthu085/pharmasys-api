import { DosageEntity } from '../entities/dosage.entity';
import { DosageEnum } from '../enums/dosage.enum';

export const IDosageRepository = Symbol('IDosageRepository');

export interface IDosageRepository {
  findByFormat(format: DosageEnum): Promise<DosageEntity | null>;
}
