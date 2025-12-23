import { AdviceEntity } from '../entities/advice.entity';
import { AdviceEnum } from '../enums/advice.enum';

export const IAdviceRepository = Symbol('IAdviceRepository');

export interface IAdviceRepository {
  findByAcronym(acronym: AdviceEnum): Promise<AdviceEntity | null>;
}
