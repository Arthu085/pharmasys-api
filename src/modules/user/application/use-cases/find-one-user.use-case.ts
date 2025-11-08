import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(uuid: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(uuid);
    const validatedUser = await this.userDomainService.validateUser(user);
    const activeUser =
      await this.userDomainService.validateUserStatus(validatedUser);

    const data = plainToInstance(UserResponseDto, activeUser, {
      excludeExtraneousValues: true,
    });

    return data;
  }

  async findEntityByUuid(uuid: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne(uuid);
    const validatedUser = await this.userDomainService.validateUser(user);
    const activeUser =
      await this.userDomainService.validateUserStatus(validatedUser);

    return activeUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    const validatedUser = await this.userDomainService.validateUser(user);

    return validatedUser;
  }

  async findByEmailForUpdate(email: string): Promise<UserEntity | null> {
    return this.userRepository.findByEmail(email);
  }
}
