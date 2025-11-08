import { Injectable } from '@nestjs/common';

import { RoleRepository } from '../../infrastructure/repositories/role.repository';

@Injectable()
export class FindOneRoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async findByName(name: string) {
    return this.roleRepository.findByName(name);
  }
}
