import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(uuid: UUID): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(uuid);
    const validatedUser =
      this.userDomainService.validateUserAndEnsureActive(user);

    return plainToInstance(UserResponseDto, validatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: UUID,
    validateActive = true,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(uuid);

    if (validateActive) {
      return this.userDomainService.validateUserAndEnsureActive(user);
    }

    return this.userDomainService.validateUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findByEmail(email);
    return this.userDomainService.validateUser(user);
  }

  async findByEmailWithoutValidation(
    email: string,
  ): Promise<UserEntity | null> {
    return await this.userRepository.findByEmail(email);
  }

  async findById(id: number): Promise<UserEntity> {
    const user = await this.userRepository.findById(id);

    return this.userDomainService.validateUser(user);
  }
}
