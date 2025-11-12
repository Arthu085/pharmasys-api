import { Injectable } from '@nestjs/common';

import { RoleRepository } from '../../infrastructure/repositories/role.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { RoleEntity } from '../../domain/entities/role.entity';

@Injectable()
export class FindOneRoleUseCase {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async findByName(name: string): Promise<RoleEntity> {
    const role = await this.roleRepository.findByName(name);

    return await this.userDomainService.validateRole(role);
  }
}
