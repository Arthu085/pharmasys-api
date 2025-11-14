import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { UserResponseDto } from '../dtos/user-response.dto';
import { plainToInstance } from 'class-transformer';
import { UserEntity } from '../../domain/entities/user.entity';
import { Email } from '../../domain/value-objects/email.vo';

@Injectable()
export class FindOneUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(uuid: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(uuid);
    const validatedUser =
      this.userDomainService.validateUserAndEnsureActive(user);

    return plainToInstance(UserResponseDto, validatedUser, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(
    uuid: string,
    validateActive = true,
  ): Promise<UserEntity> {
    const user = await this.userRepository.findOne(uuid);

    if (validateActive) {
      return this.userDomainService.validateUserAndEnsureActive(user);
    }

    return this.userDomainService.validateUser(user);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const emailVO = Email.create(email);
    const user = await this.userRepository.findByEmail(emailVO.getValue());

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
