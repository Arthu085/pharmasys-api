import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { RoleException } from '../exceptions/role.exception';
import { IPasswordHasher } from '../../../user/domain/services/password-hasher.interface';

@Injectable()
export class AuthDomainService {
  constructor(
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
  ) {}

  async validateCredentialsLogin(
    user: UserEntity | null,
    password: string,
  ): Promise<UserEntity> {
    if (!user) {
      throw new InvalidCredentialsException();
    }

    user.ensureIsActive();

    const isPasswordValid = await this.passwordHasher.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidCredentialsException();
    }

    return user;
  }

  validateRoleForRegister(role: RoleEnum): RoleEnum {
    const allowedRoles = [RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR];

    if (!role || !allowedRoles.includes(role)) {
      throw new RoleException();
    }

    return role;
  }
}
