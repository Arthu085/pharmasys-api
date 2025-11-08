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

  async execute(uuid: string, validateStatus = true): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne(uuid);

    if (validateStatus) {
      await this.userDomainService.validateUserFindOne(user);
    }

    const data = plainToInstance(UserResponseDto, user, {
      excludeExtraneousValues: true,
    });

    return data;
  }

  async findEntityByUuid(
    uuid: string,
    validateStatus = true,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findOne(uuid);

    if (validateStatus) {
      await this.userDomainService.validateUserFindOne(user);
    }

    return user;
  }

  async findByEmail(
    email: string,
    validateExistence = true,
  ): Promise<UserEntity | null> {
    const user = await this.userRepository.findByEmail(email);

    if (validateExistence) {
      await this.userDomainService.validateUserFindOne(user);
    }

    return user;
  }
}
