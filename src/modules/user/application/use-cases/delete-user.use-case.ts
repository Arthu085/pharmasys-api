import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { FindOneUserUseCase } from './find-one-user.use-case';
import { IEntityUsageChecker } from 'src/shared/interfaces/entity-usage-checker.service.interface';
import { UserEntity } from '../../domain/entities/user.entity';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(IUserRepository)
    private readonly userRepository: IUserRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    @Inject(IEntityUsageChecker)
    private readonly entityUsageChecker: IEntityUsageChecker,
  ) {}

  async execute(uuid: UUID): Promise<void> {
    await this.findOneUserUseCase.findEntityByUuid(uuid, false);
    await this.entityUsageChecker.assertNotReferenced(
      UserEntity,
      uuid,
      'Usuário',
    );
    await this.userRepository.softDelete(uuid);
  }
}
