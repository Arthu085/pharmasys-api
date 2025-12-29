import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IBatchRepository } from './domain/repositories/batch.repository.interface';
import { BatchEntity } from './domain/entities/batch.entity';
import { BatchRepository } from './infrastructure/repositories/batch.repository';
import { BatchDomainService } from './domain/services/batch-domain.service';
import { UpdateBatchUseCase } from './application/use-cases/update-batch.use-case';
import { FindOneBatchUseCase } from './application/use-cases/find-one-batch.use-case';
import { FindAllBatchUseCase } from './application/use-cases/find-all-batch.use-case';
import { DeleteBatchUseCase } from './application/use-cases/delete-batch.use-case';
import { ItemModule } from '../item/item.module';
import { CompanyModule } from '../company/company.module';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { BatchProtectedController } from './infrastructure/controllers/batch-protected.controller';
import { BatchPublicController } from './infrastructure/controllers/batch-public.controller';
import { CreateBatchUseCase } from './application/use-cases/create-batch.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([BatchEntity]),
    ItemModule,
    CompanyModule,
    UserModule,
    SharedModule,
  ],
  controllers: [BatchProtectedController, BatchPublicController],
  providers: [
    {
      provide: IBatchRepository,
      useClass: BatchRepository,
    },
    BatchDomainService,
    CreateBatchUseCase,
    UpdateBatchUseCase,
    FindOneBatchUseCase,
    FindAllBatchUseCase,
    DeleteBatchUseCase,
  ],
  exports: [FindOneBatchUseCase],
})
export class BatchModule {}
