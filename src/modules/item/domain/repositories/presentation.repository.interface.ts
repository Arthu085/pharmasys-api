import { PresentationEntity } from '../entities/presentation.entity';
import { PresentationEnum } from '../enums/presentation.enum';

export const IPresentationRepository = Symbol('IPresentationRepository');

export interface IPresentationRepository {
  findByName(name: PresentationEnum): Promise<PresentationEntity | null>;
}
