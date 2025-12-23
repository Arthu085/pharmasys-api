import { Injectable } from '@nestjs/common';

import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { UserNotFoundException } from '../exceptions/user-not-found.exception';
import { RoleNotFoundException } from '../exceptions/role-not-found.exception';
import { UserAlreadyExistsException } from '../exceptions/user-already-exists.exception';

@Injectable()
export class UserDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateUser(user: UserEntity | null): UserEntity {
    if (!user) {
      throw new UserNotFoundException();
    }

    return user;
  }

  validateUserAndEnsureActive(user: UserEntity | null): UserEntity {
    const validatedUser = this.validateUser(user);
    validatedUser.ensureIsActive();

    return validatedUser;
  }

  validateUserSameStatus(user: UserEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(user, status);
  }

  validateRole(role: RoleEntity | null): RoleEntity {
    if (!role) {
      throw new RoleNotFoundException();
    }

    return role;
  }

  validateUserExistsCreate(user: UserEntity | null): void {
    if (user) {
      throw new UserAlreadyExistsException();
    }
  }

  validateUserExistisUpdate(
    updateUser: UserEntity | null,
    existingUser: UserEntity | null,
  ): void {
    if (updateUser && existingUser && updateUser.id !== existingUser.id) {
      throw new UserAlreadyExistsException();
    }
  }
}
