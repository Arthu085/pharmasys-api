import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { BaseDomainService } from 'src/shared/domain/services/base-domain.service';
import { ExistingGenericException } from 'src/shared/exceptions/existing.exception';

@Injectable()
export class UserDomainService {
  constructor(private readonly baseDomainService: BaseDomainService) {}

  validateUser(user: UserEntity | null): UserEntity {
    return this.baseDomainService.validateEntityExists(user, 'Usuário', 'o');
  }

  validateUserStatus(user: UserEntity): UserEntity {
    return this.baseDomainService.validateEntityActive(user, 'Usuário', 'o');
  }

  validateUserSameStatus(user: UserEntity, status: StatusEnum): void {
    this.baseDomainService.validateDifferentStatus(user, status);
  }

  validateRole(role: RoleEntity | null): RoleEntity {
    return this.baseDomainService.validateEntityExists(role, 'Função', 'a');
  }

  validateUserExists(): void {
    throw new ExistingGenericException('usuário', 'o');
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
