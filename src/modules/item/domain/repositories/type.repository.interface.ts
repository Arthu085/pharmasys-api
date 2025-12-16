import { TypeEntity } from '../entities/type.entity';

export const ITypeRepository = Symbol('ITypeRepository');

export interface ITypeRepository {
  findByName(name: string): Promise<TypeEntity | null>;
}
