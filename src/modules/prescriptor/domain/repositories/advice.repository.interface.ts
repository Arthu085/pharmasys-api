import { AdviceEntity } from '../entities/advice.entity';

export const IAdviceRepository = Symbol('IAdviceRepository');

export interface IAdviceRepository {
  findByAcronym(acronym: string): Promise<AdviceEntity | null>;
}
