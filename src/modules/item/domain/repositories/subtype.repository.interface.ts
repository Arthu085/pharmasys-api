import { SubtypeEntity } from '../entities/subtype.entity';

export const ISubtypeRepository = Symbol('ISubtypeRepository');

export interface ISubtypeRepository {
  findByName(name: string): Promise<SubtypeEntity | null>;
}
