import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IPasswordHasher } from '../../domain/services/password-hasher.interface';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { UserEmail } from '../../domain/value-objects/user-email.vo';
import { UserPassword } from '../../domain/value-objects/user-password.vo';
import { UserName } from '../../domain/value-objects/user-name.vo';
import { UserAlreadyExistsException } from '../../domain/exceptions/user-already-exists.exception';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(IPasswordHasher)
    private readonly passwordHasher: IPasswordHasher,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
    private readonly findOneRoleUseCase: FindOneRoleUseCase,
  ) {}

  async execute(uuid: UUID, dto: UserUpdateDto, userId: number): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
      name: dto.name ? UserName.create(dto.name) : undefined,
      email: dto.email ? UserEmail.create(dto.email) : undefined,
      password: dto.password ? UserPassword.create(dto.password) : undefined,
      role: dto.role
        ? await this.findOneRoleUseCase.findByName(dto.role)
        : undefined,
    };

    const user = await this.findOneUserUseCase.findEntityByUuid(uuid);

    this.userDomainService.validateUserAndEnsureActive(user);

    if (binds.name) {
      user.changeName(binds.name);
    }

    if (binds.email) {
      const currentEmail = UserEmail.create(user.email);
      if (!binds.email.equals(currentEmail)) {
        const existingUserWithEmail = await this.findOneUserUseCase.findByEmail(
          binds.email.getValue(),
        );
        this.userDomainService.validateUserExistisUpdate(
          user,
          existingUserWithEmail,
        );
        user.changeEmail(binds.email);
      }
    }

    if (binds.role) {
      user.changeRole(binds.role);
    }

    if (binds.password) {
      const hashedPassword = await this.passwordHasher.hash(
        binds.password.getValue(),
      );
      const hashedPasswordVO = UserPassword.createFromHash(hashedPassword);
      user.changePassword(hashedPasswordVO);
    }

    user.userUpdated = binds.userUpdated;

    await this.userRepository.update(user.uuid, user);
  }

  async updateStatus(
    uuid: UUID,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      userUpdated: await this.findOneUserUseCase.findById(userId),
    };

    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    this.userDomainService.validateUserSameStatus(user, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      user.activate();
    } else {
      user.deactivate();
    }

    user.userUpdated = binds.userUpdated;

    await this.userRepository.update(user.uuid, user);
  }
}
