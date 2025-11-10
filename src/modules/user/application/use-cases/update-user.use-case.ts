import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { UserResponseDto } from '../dtos/user-response.dto';

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
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid);

    if (dto.email && dto.email !== user.email) {
      const existingUserWithEmail =
        await this.findOneUserUseCase.findByEmailForUpdate(dto.email);
      await this.userDomainService.validateUserEmailUpdate(
        user,
        dto.email,
        existingUserWithEmail,
      );
    }

    if (dto.role) {
      const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);
      user.role = role;
    }

    if (dto.name) {
      user.name = dto.name;
    }

    if (dto.email) {
      user.email = dto.email;
    }

    if (dto.password) {
      user.password = await this.userDomainService.hashPassword(dto.password);
    }

    user.userUpdated = userId;
    user.updatedAt = new Date();

    await this.userRepository.update(user);
  }

  async updateStatus(uuid: string, dto: ChangeStatusDto, userId: number) {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    await this.userDomainService.validateUserSameStatus(user, dto.status);

    user.status = dto.status;
    user.userUpdated = userId;
    user.updatedAt = new Date();

    await this.userRepository.update(user);
  }
}
