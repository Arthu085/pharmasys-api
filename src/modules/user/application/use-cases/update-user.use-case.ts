import { Inject, Injectable } from '@nestjs/common';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { IPasswordHasher } from '../../domain/services/password-hasher.interface';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
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

  async execute(
    uuid: string,
    dto: UserUpdateDto,
    userId: number,
  ): Promise<void> {
    const updatingUser = await this.findOneUserUseCase.findById(userId);
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid);

    if (dto.email) {
      const email = Email.create(dto.email);
      const currentEmail = Email.create(user.email);

      if (!email.equals(currentEmail)) {
        const existingUserWithEmail =
          await this.findOneUserUseCase.findByEmailWithoutValidation(
            email.getValue(),
          );

        if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
          throw new UserAlreadyExistsException();
        }
      }

      user.changeEmail(email);
    }

    if (dto.role) {
      const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);
      user.changeRole(role);
    }

    if (dto.name) {
      const name = UserName.create(dto.name);
      user.changeName(name);
    }

    if (dto.password) {
      const password = Password.create(dto.password);
      const hashedPassword = await this.passwordHasher.hash(
        password.getValue(),
      );
      const hashedPasswordVO = Password.createFromHash(hashedPassword);
      user.changePassword(hashedPasswordVO);
    }

    user.userUpdated = updatingUser;

    await this.userRepository.update(user);
  }

  async updateStatus(
    uuid: string,
    dto: ChangeStatusDto,
    userId: number,
  ): Promise<void> {
    const updatingUser = await this.findOneUserUseCase.findById(userId);
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    this.userDomainService.validateUserSameStatus(user, dto.status);

    if (dto.status === StatusEnum.ATIVO) {
      user.activate();
    } else {
      user.deactivate();
    }

    user.userUpdated = updatingUser;

    await this.userRepository.update(user);
  }
}
