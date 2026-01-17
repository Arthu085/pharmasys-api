import { Injectable } from '@nestjs/common';

import { TransferRequestEntity } from '../entities/transfer-request.entity';
import { TransferRequestNotFoundException } from '../exceptions/transfer-request-not-found.exception';
import { TransferReasonEntity } from '../entities/transfer-reason.entity';
import { TransferReasonNotFoundException } from '../exceptions/transfer-reason-not-found.exception';
import { TransferRequestItemEntity } from '../entities/transfer-request-item.entity';
import { TransferRequestItemNotFoundException } from '../exceptions/transfer-request-item-not-found.exceptio';
import { TransferStatusEnum } from '../enums/transfer-status.enum';
import { TransferRequestStatusException } from '../exceptions/transfer-request-status.exception';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TransferRequestUserException } from '../exceptions/transfer-request-user.exception';
import { TransferStatusItemEnum } from '../enums/transfer-status-item.enum';
import { TransferRequestItemStatusException } from '../exceptions/transfer-request-item-status.exception';
import { TransferRequestItemUserException } from '../exceptions/transfer-request-item-user.exception';
import { TransferRequestStatusValidateException } from '../exceptions/transfer-request-status-validate.exception';
import { TransferRequestItemStatusValidateException } from '../exceptions/transfer-request-item-status-validate.exception';
import { TransferRequestStatusUpdateException } from '../exceptions/transfer-request-status-update.exception';
import { TransferRequestStatusDeleteException } from '../exceptions/transfer-request-status-delete.exception';

@Injectable()
export class TransferRequestDomainService {
  constructor() {}

  validateTransferRequest(
    transferRequestEntity: TransferRequestEntity | null,
  ): TransferRequestEntity {
    if (!transferRequestEntity) {
      throw new TransferRequestNotFoundException();
    }

    return transferRequestEntity;
  }

  validateTransferRequestItem(
    transferRequestItem: TransferRequestItemEntity | null,
  ): TransferRequestItemEntity {
    if (!transferRequestItem) {
      throw new TransferRequestItemNotFoundException();
    }

    return transferRequestItem;
  }

  validateTransferReason(
    transferReason: TransferReasonEntity | null,
  ): TransferReasonEntity {
    if (!transferReason) {
      throw new TransferReasonNotFoundException();
    }

    return transferReason;
  }

  validateTransferRequestStatus(statusTransfer: TransferStatusEnum): void {
    if (statusTransfer !== TransferStatusEnum.PENDENTE) {
      throw new TransferRequestStatusException();
    }
  }

  validateTransferRequestUser(
    userCreated: UserEntity,
    userUpdating: UserEntity,
  ): void {
    if (userCreated.id !== userUpdating.id) {
      throw new TransferRequestUserException();
    }
  }

  validateTransferRequestItemStatus(
    statusTransferItem: TransferStatusItemEnum,
  ): void {
    if (statusTransferItem !== TransferStatusItemEnum.ABERTO) {
      throw new TransferRequestItemStatusException();
    }
  }

  validateTransferRequestItemUser(
    userCreated: UserEntity,
    userUpdating: UserEntity,
  ): void {
    if (userCreated.id !== userUpdating.id) {
      throw new TransferRequestItemUserException();
    }
  }

  validateStatusTransferRequest(statusTransfer: TransferStatusEnum): void {
    if (!statusTransfer) {
      throw new TransferRequestStatusValidateException();
    }
  }

  validateStatusTransferRequestItem(
    statusTransferItem: TransferStatusItemEnum,
  ): void {
    if (!statusTransferItem) {
      throw new TransferRequestItemStatusValidateException();
    }
  }

  validateStatusTransferRequestUpdate(
    transferRequest: TransferRequestEntity,
    statusTransfer: TransferStatusEnum,
  ): void {
    if (
      transferRequest.statusTransfer !== TransferStatusEnum.PENDENTE &&
      statusTransfer === TransferStatusEnum.SEPARACAO
    ) {
      throw new TransferRequestStatusUpdateException(
        "Só é possível alterar para o status 'Em Separação' quando o status atual for 'Pendente'",
      );
    }

    if (
      transferRequest.statusTransfer !== TransferStatusEnum.SEPARACAO &&
      statusTransfer === TransferStatusEnum.CONCLUIDO
    ) {
      throw new TransferRequestStatusUpdateException(
        "Só é possível alterar para o status 'Concluído' quando o status atual for 'Em Separação'",
      );
    }

    if (
      transferRequest.statusTransfer === TransferStatusEnum.CONCLUIDO &&
      (statusTransfer === TransferStatusEnum.NEGADO ||
        statusTransfer === TransferStatusEnum.SEPARACAO)
    ) {
      throw new TransferRequestStatusUpdateException(
        "Não é possível alterar o status de uma requisição 'Concluída' ou em 'Em Separação' para 'Negada'",
      );
    }
  }

  validateStatusTransferRequestDelete(
    transferRequest: TransferRequestEntity,
  ): void {
    if (transferRequest.statusTransfer !== TransferStatusEnum.PENDENTE) {
      throw new TransferRequestStatusDeleteException(
        "Só é possível deletar uma requisição de transferência com status 'Pendente'",
      );
    }
  }
}
