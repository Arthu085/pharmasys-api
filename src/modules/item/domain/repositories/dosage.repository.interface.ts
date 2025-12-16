import { DosageEntity } from '../entities/dosage.entity';

export const IDosageRepository = Symbol('IDosageRepository');

export interface IDosageRepository {
  findByFormat(format: string): Promise<DosageEntity | null>;
}
