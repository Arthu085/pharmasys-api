import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { UserDomainService } from '../../domain/services/user-domain.service';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly userDomainService: UserDomainService,
  ) {}

  async execute(uuid: string) {
    const user = await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    await this.userDomainService.validateUserDelete(user);

    return this.userRepository.softDelete(uuid);
  }
}
