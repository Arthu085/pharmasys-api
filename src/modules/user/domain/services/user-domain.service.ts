import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { RoleEntity } from '../entities/role.entity';
import { UserEntity } from '../entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { ExistingUserException } from '../exceptions/existing-user.exception';
import { InactiveUserException } from 'src/modules/auth/domain/exceptions/inactive-user.exception';
import { SameStatusUserException } from '../exceptions/same-status-user.exception';
import { NotFoundGenericException } from 'src/shared/exceptions/not-found.exception';

@Injectable()
export class UserDomainService {
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async comparePasswords(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  async validateUser(user: UserEntity | null): Promise<UserEntity> {
    if (!user) {
      throw new NotFoundGenericException('Usuário', 'o');
    }

    return user;
  }

  async validateUserStatus(user: UserEntity): Promise<UserEntity> {
    if (user.status === StatusEnum.INATIVO) {
      throw new InactiveUserException();
    }

    return user;
  }

  async validateUserExists(user: UserEntity | null): Promise<void> {
    if (user) {
      throw new ExistingUserException();
    }
  }

  async validateRole(role: RoleEntity | null): Promise<RoleEntity> {
    if (!role) {
      throw new NotFoundGenericException('Função', 'a');
    }

    return role;
  }

  async validateUserEmailUpdate(
    user: UserEntity,
    email: string,
    userEmail: UserEntity | null,
  ): Promise<void> {
    if (email && email !== user.email) {
      if (userEmail && userEmail.id !== user.id) {
        throw new ExistingUserException();
      }
    }
  }

  async validateUserSameStatus(
    user: UserEntity,
    status: StatusEnum,
  ): Promise<void> {
    if (user?.status === status) {
      throw new SameStatusUserException();
    }
  }
}
