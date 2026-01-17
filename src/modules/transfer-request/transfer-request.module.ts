import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferReasonEntity } from './domain/entities/transfer-reason.entity';
import { TransferRequestEntity } from './domain/entities/transfer-request.entity';
import { TransferRequestItemEntity } from './domain/entities/transfer-request-item.entity';
import { ITransferRequestRepository } from './domain/repositories/transfer-request.repository.interface';
import { ITransferRequestItemRepository } from './domain/repositories/transfer-request-item.repository.interface';
import { ITransferReasonRepository } from './domain/repositories/transfer-reason.repository.interface';
import { TransferRequestRepository } from './infrastructure/repositories/transfer-request.repository';
import { TransferRequestItemRepository } from './infrastructure/repositories/transfer-request-item.repository';
import { TransferReasonRepository } from './infrastructure/repositories/transfer-reason.repository';
import { TransferRequestDomainService } from './domain/services/transfer-request-domain.service';
import { CreateTransferRequestUseCase } from './application/use-cases/create-transfer-request.use-case';
import { CreateTransferRequestItemUseCase } from './application/use-cases/create-transfer-request-item.use-case';
import { FindOneTransferRequestUseCase } from './application/use-cases/find-one-transfer-request.use-case';
import { FindAllTransferRequestUseCase } from './application/use-cases/find-all-transfer-request.use-case';
import { UpdateTransferRequestUseCase } from './application/use-cases/update-transfer-request.use-case';
import { UpdateTransferRequestItemUseCase } from './application/use-cases/update-transfer-request-item.use-case';
import { DeleteTransferRequestUseCase } from './application/use-cases/delete-transfer-request.use-case';
import { DeleteTransferRequestItemUseCase } from './application/use-cases/delete-transfer-request-item.use-case';
import { FindOneTransferReasonUseCase } from './application/use-cases/find-one-transfer-reason.use-case';
import { FindOneTransferRequestItemUseCase } from './application/use-cases/find-one-transfer-request-item.use-case';
import { TransferRequestProtectedController } from './infrastructure/controllers/transfer-request-protected.controller';
import { TransferRequestPublicController } from './infrastructure/controllers/transfer-request-public.controller';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { StockBalanceModule } from '../stock-balance/stock-balance.module';
import { StockTransferModule } from '../stock-transfer/stock-transfer.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransferReasonEntity,
      TransferRequestEntity,
      TransferRequestItemEntity,
    ]),
    UserModule,
    ItemModule,
    BatchModule,
    StockLocationModule,
    StockBalanceModule,
    StockTransferModule,
    SharedModule,
  ],
  controllers: [
    TransferRequestProtectedController,
    TransferRequestPublicController,
  ],
  providers: [
    {
      provide: ITransferRequestRepository,
      useClass: TransferRequestRepository,
    },
    {
      provide: ITransferRequestItemRepository,
      useClass: TransferRequestItemRepository,
    },
    {
      provide: ITransferReasonRepository,
      useClass: TransferReasonRepository,
    },
    TransferRequestDomainService,
    CreateTransferRequestUseCase,
    CreateTransferRequestItemUseCase,
    FindOneTransferRequestUseCase,
    FindAllTransferRequestUseCase,
    UpdateTransferRequestUseCase,
    UpdateTransferRequestItemUseCase,
    DeleteTransferRequestUseCase,
    DeleteTransferRequestItemUseCase,
    FindOneTransferReasonUseCase,
    FindOneTransferRequestItemUseCase,
  ],
  exports: [FindOneTransferRequestUseCase, FindOneTransferReasonUseCase],
})
export class TransferRequestModule {}
