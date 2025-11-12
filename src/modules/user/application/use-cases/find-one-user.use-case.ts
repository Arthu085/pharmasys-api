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

    return plainToInstance(UserResponseDto, activeUser, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
    validateActive = true,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(uuid);
    const validatedUser = await this.userDomainService.validateUser(user);

    if (validateActive) {
      return await this.userDomainService.validateUserStatus(validatedUser);
    }

    return validatedUser;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);

    return await this.userDomainService.validateUser(user);
  }

  async findByEmailWithoutValidation(
    email: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    return await this.userDomainService.validateUser(user);
  }
}
