import { Inject } from '@nestjs/common';
import { UUID } from 'crypto';
import { DataSource } from 'typeorm';

import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { TransferRequestUpdateDto } from '../dtos/transfer-request-update.dto';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { TransferRequestDate } from '../../domain/value-objects/transfer-request-date.vo';
import { FindOneTransferReasonUseCase } from './find-one-transfer-reason.use-case';
import { FindOneTransferRequestUseCase } from './find-one-transfer-request.use-case';
import { TransferRequestDomainService } from '../../domain/services/transfer-request-domain.service';
import { TransferRequestUpdateStatusDto } from '../dtos/transfer-request-update-status.dto';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';
import { UpdateTransferRequestItemUseCase } from './update-transfer-request-item.use-case';
import { TransferStatusItemEnum } from '../../domain/enums/transfer-status-item.enum';

export class UpdateTransferRequestUseCase {
  constructor(
    @Inject(ITransferRequestRepository)
    private readonly transferRequestRepository: ITransferRequestRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findOneTransferReasonUseCase: FindOneTransferReasonUseCase,
    private readonly findOneTransferRequestUseCase: FindOneTransferRequestUseCase,
    private readonly updateTransferRequestItemUseCase: UpdateTransferRequestItemUseCase,
    private readonly transferRequestDomainService: TransferRequestDomainService,
    private readonly dataSource: DataSource,
  ) {}

  async execute(
    uuid: UUID,
    dto: TransferRequestUpdateDto,
    userId: number,
  ): Promise<void> {
    const binds = {
      origin: dto.origin
        ? await this.findOneStockLocationUseCase.findEntityByUuid(dto.origin)
        : undefined,
      destination: dto.destination
        ? await this.findOneStockLocationUseCase.findEntityByUuid(
            dto.destination,
          )
        : undefined,
      requestDate: dto.requestDate
        ? TransferRequestDate.create(dto.requestDate)
        : undefined,
      reason: dto.reason
        ? await this.findOneTransferReasonUseCase.findByName(dto.reason)
        : undefined,
    };

    const userUpdating = await this.findOneUserUseCase.findById(userId);
    const transferRequest =
      await this.findOneTransferRequestUseCase.findEntityByUuid(uuid);

    this.transferRequestDomainService.validateTransferRequestStatus(
      transferRequest.statusTransfer,
    );

    this.transferRequestDomainService.validateTransferRequestUser(
      transferRequest.userCreated,
      userUpdating,
    );

    if (binds.origin) {
      transferRequest.changeOrigin(binds.origin);
    }

    if (binds.destination) {
      transferRequest.changeDestination(binds.destination);
    }

    if (binds.requestDate) {
      transferRequest.changeRequestDate(binds.requestDate);
    }

    if (binds.reason) {
      transferRequest.changeReason(binds.reason);
    }

    transferRequest.userUpdated = userUpdating;

    await this.transferRequestRepository.update(
      transferRequest.uuid,
      transferRequest,
    );
  }

  async updateStatusTransfer(
    uuid: UUID,
    dto: TransferRequestUpdateStatusDto,
    userId: number,
  ): Promise<void> {
    await this.dataSource.transaction(async (entityManager) => {
      const binds = {
        statusTransfer: dto.statusTransfer,
      };

      const userUpdating = await this.findOneUserUseCase.findById(userId);
      const transferRequest =
        await this.findOneTransferRequestUseCase.findEntityByUuid(uuid);

      switch (binds.statusTransfer) {
        case TransferStatusEnum.SEPARACAO:
          this.transferRequestDomainService.validateStatusTransferRequestUpdate(
            transferRequest,
            binds.statusTransfer,
          );
          await this.transferRequestRepository.updateStatus(
            transferRequest.uuid,
            TransferStatusEnum.SEPARACAO,
            userUpdating,
          );
          await this.updateTransferRequestItemUseCase.updateStatusTransferItem(
            transferRequest.items,
            transferRequest,
            { statusTransferItem: TransferStatusItemEnum.SEPARACAO },
            userUpdating,
            entityManager,
          );
          break;
        case TransferStatusEnum.CONCLUIDO:
          this.transferRequestDomainService.validateStatusTransferRequestUpdate(
            transferRequest,
            binds.statusTransfer,
          );
          await this.transferRequestRepository.updateStatus(
            transferRequest.uuid,
            TransferStatusEnum.CONCLUIDO,
            userUpdating,
          );
          await this.updateTransferRequestItemUseCase.updateStatusTransferItem(
            transferRequest.items,
            transferRequest,
            { statusTransferItem: TransferStatusItemEnum.FINALIZADO },
            userUpdating,
            entityManager,
          );
          break;
        case TransferStatusEnum.NEGADO:
          this.transferRequestDomainService.validateStatusTransferRequestUpdate(
            transferRequest,
            binds.statusTransfer,
          );
          await this.transferRequestRepository.updateStatus(
            transferRequest.uuid,
            TransferStatusEnum.NEGADO,
            userUpdating,
          );
          await this.updateTransferRequestItemUseCase.updateStatusTransferItem(
            transferRequest.items,
            transferRequest,
            { statusTransferItem: TransferStatusItemEnum.CANCELADO },
            userUpdating,
            entityManager,
          );
          break;
        default:
          this.transferRequestDomainService.validateStatusTransferRequest(
            binds.statusTransfer,
          );
          break;
      }
    });
  }
}
