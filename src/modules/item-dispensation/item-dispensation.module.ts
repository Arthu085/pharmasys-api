import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemDispensationEntity } from './domain/entities/item-dispensation.entity';
import { ItemDispensationItemEntity } from './domain/entities/item-dispensation-item.entity';
import { IItemDispensationRepository } from './domain/repositories/item-dispensation.repository.interface';
import { IItemDispensationItemRepository } from './domain/repositories/item-dispensation-item.repository.interface';
import { ItemDispensationRepository } from './infrastructure/repositories/item-dispensation.repository';
import { ItemDispensationItemRepository } from './infrastructure/repositories/item-dispensation-item.repository';
import { ItemDispensationDomainService } from './domain/services/item-dispensation-domain.service';
import { CreateItemDispensationUseCase } from './application/use-cases/create-item-dispensation.use-case';
import { CreateItemDispensationItemUseCase } from './application/use-cases/create-item-dispensation-item.use-case';
import { FindOneItemDispensationUseCase } from './application/use-cases/find-one-item-dispensation.use-case';
import { FindAllItemDispensationUseCase } from './application/use-cases/find-all-item-dispensation.use-case';
import { ItemDispensationProtectedController } from './infrastructure/controllers/item-dispensation-protected.controller';
import { ItemDispensationPublicController } from './infrastructure/controllers/item-dispensation-public.controller';
import { UserModule } from '../user/user.module';
import { ItemModule } from '../item/item.module';
import { BatchModule } from '../batch/batch.module';
import { StockLocationModule } from '../stock-location/stock-location.module';
import { PatientModule } from '../patient/patient.module';
import { PrescriptorModule } from '../prescriptor/prescriptor.module';
import { StockBalanceModule } from '../stock-balance/stock-balance.module';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemDispensationEntity,
      ItemDispensationItemEntity,
    ]),
    UserModule,
    ItemModule,
    BatchModule,
    StockLocationModule,
    PatientModule,
    PrescriptorModule,
    StockBalanceModule,
    SharedModule,
  ],
  controllers: [
    ItemDispensationProtectedController,
    ItemDispensationPublicController,
  ],
  providers: [
    {
      provide: IItemDispensationRepository,
      useClass: ItemDispensationRepository,
    },
    {
      provide: IItemDispensationItemRepository,
      useClass: ItemDispensationItemRepository,
    },
    ItemDispensationDomainService,
    CreateItemDispensationUseCase,
    CreateItemDispensationItemUseCase,
    FindOneItemDispensationUseCase,
    FindAllItemDispensationUseCase,
  ],
  exports: [FindOneItemDispensationUseCase],
})
export class ItemDispensationModule {}
