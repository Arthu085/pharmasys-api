import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { StatusEnum } from '../../../../shared/enums/status.enum';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { InactiveUserException } from '../exceptions/inactive-user.exception';
import { RoleException } from '../exceptions/role.exception';
import { UserDomainService } from '../../../user/domain/services/user-domain.service';

@Injectable()
export class AuthDomainService {
  constructor(private readonly userDomainService: UserDomainService) {}

  async validateCredentialsLogin(
    user: UserEntity | null,
    password: string,
  ): Promise<UserEntity> {
    if (!user) {
      throw new InvalidCredentialsException();
    }

    if (user.status === StatusEnum.INATIVO) {
      throw new InactiveUserException();
    }

    const isPasswordValid = await this.userDomainService.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  validateRoleForRegister(role: RoleEnum): void {
    const allowedRoles = [RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR];

    if (!role || !allowedRoles.includes(role)) {
      throw new RoleException();
    }
  }
}
