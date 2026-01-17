import { Inject, Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UUID } from 'crypto';

import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { TransferRequestResponseOneDto } from '../dtos/transfer-request-response-one.dto';
import { TransferRequestEntity } from '../../domain/entities/transfer-request.entity';

@Injectable()
export class FindOneTransferRequestUseCase {
  constructor(
    @Inject(ITransferRequestRepository)
    private readonly transferRequestRepository: ITransferRequestRepository,
    private readonly transferRequestDomainService: TransferRequestDomainService,
  ) {}

  async execute(uuid: UUID): Promise<TransferRequestResponseOneDto> {
    const transferRequest = await this.transferRequestRepository.findOne(uuid);
    this.transferRequestDomainService.validateTransferRequest(transferRequest);

    return plainToInstance(TransferRequestResponseOneDto, transferRequest, {
      excludeExtraneousValues: true,
    });
  }

  async findEntityByUuid(uuid: UUID): Promise<TransferRequestEntity> {
    const transferRequest = await this.transferRequestRepository.findOne(uuid);

    return this.transferRequestDomainService.validateTransferRequest(
      transferRequest,
    );
  }
}
