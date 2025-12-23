import { SubtypeEntity } from '../entities/subtype.entity';
import { SubtypeEnum } from '../enums/subtype.enum';

export const ISubtypeRepository = Symbol('ISubtypeRepository');

export interface ISubtypeRepository {
  findByName(name: SubtypeEnum): Promise<SubtypeEntity | null>;
}
