import { Inject, Injectable } from '@nestjs/common';

import { IRoleRepository } from '../../domain/repositories/role.repository.interface';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { RoleEntity } from '../../domain/entities/role.entity';
import { RoleEnum } from 'src/shared/enums/role.enum';

@Injectable()
export class FindOneRoleUseCase {
  constructor(
    @Inject(IRoleRepository)
    private readonly roleRepository: IRoleRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async findByName(name: RoleEnum): Promise<RoleEntity> {
    const role = await this.roleRepository.findByName(name);

    return this.userDomainService.validateRole(role);
  }
}
