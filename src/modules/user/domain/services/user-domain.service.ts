import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ExistingUserException } from '../exceptions/existing-user.exception';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';

@Injectable()
export class UserDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateUser(user: UserEntity | null): UserEntity {
    return this.baseDomainService.validateEntityExists(user, 'Usuário', 'o');
  }

  validateUserStatus(user: UserEntity): UserEntity {
    return this.baseDomainService.validateEntityActive(user, 'Usuário', 'o');
  }

  validateRole(role: RoleEntity | null): RoleEntity {
    return this.baseDomainService.validateEntityExists(role, 'Função', 'a');
  }

  validateUserExists(user: UserEntity | null): void {
    if (user) {
      throw new ExistingUserException();
    }
  }

  validateUserEmailUpdate(user: UserEntity, userEmail: UserEntity): void {
    if (userEmail.id !== user.id) {
      throw new ExistingUserException();
    }
  }

  validateUserSameStatus(user: UserEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(user, status);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
