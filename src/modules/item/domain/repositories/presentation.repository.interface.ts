import { PresentationEntity } from '../entities/presentation.entity';

export const IPresentationRepository = Symbol('IPresentationRepository');

export interface IPresentationRepository {
  findByName(name: string): Promise<PresentationEntity | null>;
}
