import { Injectable } from '@nestjs/common';

import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(uuid: string) {
    await this.findOneUserUseCase.findEntityByUuid(uuid, false);

    return await this.userRepository.softDelete(uuid);
  }
}
