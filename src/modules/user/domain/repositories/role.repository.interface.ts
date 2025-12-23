import { RoleEntity } from '../entities/role.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';

export const IRoleRepository = Symbol('IRoleRepository');

export interface IRoleRepository {
  findByName(name: RoleEnum): Promise<RoleEntity | null>;
}
