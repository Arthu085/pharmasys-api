import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { FindOneUserUseCase } from './find-one-user.use-case';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneUserUseCase.findEntityByUuid(uuid, false);
    await this.userRepository.softDelete(uuid);
  }
}
