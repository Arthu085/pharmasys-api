import { Inject, Injectable } from '@nestjs/common';

import { DataSourceProvider } from 'src/core/database/providers/data-source.provider';
import { FindOneUserUseCase } from 'src/modules/user/application/use-cases/find-one-user.use-case';
import { FindOneStockLocationUseCase } from 'src/modules/stock-location/application/use-cases/find-one-stock-location.use-case';
import { ITransferRequestRepository } from '../../domain/repositories/transfer-request.repository.interface';
import { CreateTransferRequestItemUseCase } from './create-transfer-request-item.use-case';
import { TransferRequestCreateDto } from '../dtos/transfer-request-create.dto';
import { TransferRequestItemCreateDto } from '../dtos/transfer-request-item-create.dto';
import { TransferRequestDate } from '../../domain/value-objects/transfer-request-date.vo';
import { FindOneTransferReasonUseCase } from './find-one-transfer-reason.use-case';
import { TransferStatusEnum } from '../../domain/enums/transfer-status.enum';

@Injectable()
export class CreateTransferRequestUseCase {
  constructor(
    @Inject(ITransferRequestRepository)
    private readonly transferRequestRepository: ITransferRequestRepository,
    private readonly findOneUserUseCase: FindOneUserUseCase,
    private readonly findOneStockLocationUseCase: FindOneStockLocationUseCase,
    private readonly findOneTransferReasonUseCase: FindOneTransferReasonUseCase,
    private readonly createTransferRequestItemUseCase: CreateTransferRequestItemUseCase,
    private readonly dataSourceProvider: DataSourceProvider,
  ) {}

  async execute(
    dto: TransferRequestCreateDto,
    dtoItems: TransferRequestItemCreateDto[],
    userId: number,
  ): Promise<void> {
    await this.dataSourceProvider
      .getDataSource()
      .transaction(async (entityManager) => {
        const binds = {
          userCreated: await this.findOneUserUseCase.findById(userId),
          requestDate: TransferRequestDate.create(dto.requestDate),
          origin: await this.findOneStockLocationUseCase.findEntityByUuid(
            dto.origin,
          ),
          destination: await this.findOneStockLocationUseCase.findEntityByUuid(
            dto.destination,
          ),
          reason: await this.findOneTransferReasonUseCase.findByName(
            dto.reason,
          ),
        };

        const transferRequestEntity =
          await this.transferRequestRepository.create(
            {
              ...binds,
              requestDate: binds.requestDate.getValue(),
              statusTransfer: TransferStatusEnum.PENDENTE,
            },
            entityManager,
          );

        for (const dtoItem of dtoItems) {
          await this.createTransferRequestItemUseCase.execute(
            dtoItem,
            transferRequestEntity,
            entityManager,
          );
        }
      });
  }
}
