import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { Email } from '../../domain/value-objects/email.vo';
import { Password } from '../../domain/value-objects/password.vo';
import { UserName } from '../../domain/value-objects/user-name.vo';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
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

    if (dto.email && dto.email !== user.email) {
      const email = Email.create(dto.email);
      const existingUserWithEmail =
        await this.findOneUserUseCase.findByEmailWithoutValidation(
          email.getValue(),
        );

      if (existingUserWithEmail && existingUserWithEmail.id !== user.id) {
        this.userDomainService.validateUserExists();
      }

      user.email = email.getValue();
    }

    if (dto.role) {
      const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);
      user.role = role;
    }

    if (dto.name) {
      const name = UserName.create(dto.name);
      user.name = name.getValue();
    }

    if (dto.password) {
      const password = Password.create(dto.password);
      user.password = await this.userDomainService.hashPassword(
        password.getValue(),
      );
    }

    user.userUpdated = updatingUser;
    user.updatedAt = new Date();

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

    user.status = dto.status;
    user.userUpdated = updatingUser;
    user.updatedAt = new Date();

    await this.userRepository.update(user);
  }
}
