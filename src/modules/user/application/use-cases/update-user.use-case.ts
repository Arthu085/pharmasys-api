import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserEntity } from '../../domain/entities/user.entity';
import { UserUpdateDto } from '../dtos/user-update.dto';
import { FindOneRoleUseCase } from './find-one-role.use-case';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { ChangeStatusDto } from 'src/shared/dtos/change-status.dto';
import { RoleEnum } from 'src/shared/enums/role.enum';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';

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
  ): Promise<UserResponseDto> {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid);
    let userEmail: UserEntity | null = null;

    if (dto.email) {
      userEmail = await this.findOneUserUseCase.findByEmail(dto.email, false);
    }

    await this.userDomainService.validateUserUpdate(user, dto.email, userEmail);

    if (dto.role) {
      const role = await this.findOneRoleUseCase.findByName(RoleEnum[dto.role]);

      if (role) {
        user!.role = role;
      }
    }

    if (dto.name) {
      user!.name = dto.name;
    }

    if (dto.email) {
      user!.email = dto.email;
    }

    if (dto.password) {
      user!.password = await this.userDomainService.hashPassword(dto.password);
    }

    user!.userUpdated = userId;

    await this.userRepository.update(user!.uuid, user!);

    const updatedUser = await this.findOneUserUseCase.execute(uuid);

    return updatedUser;
  }

  async updateStatus(uuid: string, dto: ChangeStatusDto, userId: number) {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    await this.userDomainService.validateUserStatusUpdate(user, dto.status);

    user!.status = dto.status;
    user!.userUpdated = userId;

    await this.userRepository.update(uuid, user!);
  }
}
