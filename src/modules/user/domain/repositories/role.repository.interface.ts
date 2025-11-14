import { RoleEntity } from '../entities/role.entity';

export const IRoleRepository = Symbol('IRoleRepository');

export interface IRoleRepository {
  findByName(name: string): Promise<RoleEntity | null>;
}
