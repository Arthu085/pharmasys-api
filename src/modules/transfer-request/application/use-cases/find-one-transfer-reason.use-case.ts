import { Inject, Injectable } from '@nestjs/common';
import { ITransferReasonRepository } from '../../domain/repositories/transfer-reason.repository.interface';
import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { TransferReasonEnum } from '../../domain/enums/transfer-reason.enum';

@Injectable()
export class FindOneTransferReasonUseCase {
  constructor(
    @Inject(ITransferReasonRepository)
    private readonly transferReasonRepository: ITransferReasonRepository,
    private readonly transferRequestDomainService: TransferRequestDomainService,
  ) {}

  async findByName(name: TransferReasonEnum) {
    const transferReason = await this.transferReasonRepository.findByName(name);
    return this.transferRequestDomainService.validateTransferReason(
      transferReason,
    );
  }
}
