import { TypeEntity } from '../entities/type.entity';
import { TypeEnum } from '../enums/type.enum';

export const ITypeRepository = Symbol('ITypeRepository');

export interface ITypeRepository {
  findByName(name: TypeEnum): Promise<TypeEntity | null>;
}
