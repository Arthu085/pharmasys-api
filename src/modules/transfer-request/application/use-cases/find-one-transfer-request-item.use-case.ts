import { Inject, Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { ITransferRequestItemRepository } from '../../domain/repositories/transfer-request-item.repository.interface';
import { TransferRequestItemEntity } from '../../domain/entities/transfer-request-item.entity';

@Injectable()
export class FindOneTransferRequestItemUseCase {
  constructor(
    @Inject(ITransferRequestItemRepository)
    private readonly transferRequestItemRepository: ITransferRequestItemRepository,
    private readonly transferRequestDomainService: TransferRequestDomainService,
  ) {}

  async findEntityByUuid(uuid: UUID): Promise<TransferRequestItemEntity> {
    const transferRequest =
      await this.transferRequestItemRepository.findOne(uuid);

    return this.transferRequestDomainService.validateTransferRequestItem(
      transferRequest,
    );
  }
}
