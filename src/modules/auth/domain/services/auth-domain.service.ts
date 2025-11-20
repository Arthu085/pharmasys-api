import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from '../../../user/domain/entities/user.entity';
import { RoleEnum } from '../../../../shared/enums/role.enum';
import { InvalidCredentialsException } from '../exceptions/invalid-credentials.exception';
import { RoleException } from '../exceptions/role.exception';
import { UserDomainService } from '../../../user/domain/services/user-domain.service';
import { IPasswordHasher } from '../../../user/domain/services/password-hasher.interface';

@Injectable()
export class AuthDomainService {
  constructor(
    private readonly userDomainService: UserDomainService,
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

  validateRoleForRegister(role: RoleEnum): void {
    const allowedRoles = [RoleEnum.FARMACEUTICO, RoleEnum.OPERADOR];

    if (!role || !allowedRoles.includes(role)) {
      throw new RoleException();
    }
  }
}
