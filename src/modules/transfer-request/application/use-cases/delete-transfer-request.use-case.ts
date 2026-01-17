import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { DataSourceProvider } from 'src/core/database/providers/data-source.provider';
import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { FindOneTransferRequestUseCase } from './find-one-transfer-request.use-case';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { DeleteTransferRequestItemUseCase } from './delete-transfer-request-item.use-case';

@Injectable()
export class DeleteTransferRequestUseCase {
  constructor(
    @Inject(ITransferRequestRepository)
    private readonly transferRequestRepository: ITransferRequestRepository,
    private readonly findOneTransferRequestUseCase: FindOneTransferRequestUseCase,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly deleteTransferRequestItemUseCase: DeleteTransferRequestItemUseCase,
    private readonly transferRequestDomainService: TransferRequestDomainService,
    private readonly dataSourceProvider: DataSourceProvider,
  ) {}

  async execute(uuid: UUID, userId: number): Promise<void> {
    await this.dataSourceProvider
      .getDataSource()
      .transaction(async (entityManager) => {
        const userDeleting = await this.findOneUserUseCase.findById(userId);
        const transferRequest =
          await this.findOneTransferRequestUseCase.findEntityByUuid(uuid);

        this.transferRequestDomainService.validateTransferRequestUser(
          transferRequest.userCreated,
          userDeleting,
        );

        this.transferRequestDomainService.validateTransferRequestStatus(
          transferRequest.statusTransfer,
        );

        if (transferRequest.items && transferRequest.items.length > 0) {
          await this.deleteTransferRequestItemUseCase.execute(
            transferRequest.items,
            entityManager,
          );
        }

        await this.transferRequestRepository.softDelete(uuid, entityManager);
      });
  }
}
