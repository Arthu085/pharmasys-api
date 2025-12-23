import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IItemRepository } from './domain/repositories/item.repository.interface';
import { IDosageRepository } from './domain/repositories/dosage.repository.interface';
import { IPresentationRepository } from './domain/repositories/presentation.repository.interface';
import { ITypeRepository } from './domain/repositories/type.repository.interface';
import { ISubtypeRepository } from './domain/repositories/subtype.repository.interface';
import { ItemEntity } from './domain/entities/item.entity';
import { DosageEntity } from './domain/entities/dosage.entity';
import { PresentationEntity } from './domain/entities/presentation.entity';
import { TypeEntity } from './domain/entities/type.entity';
import { SubtypeEntity } from './domain/entities/subtype.entity';
import { ItemRepository } from './infraestructure/repositories/item.repository';
import { DosageRepository } from './infraestructure/repositories/dosage.repository';
import { PresentationRepository } from './infraestructure/repositories/presentation.repository';
import { TypeRepository } from './infraestructure/repositories/type.repository';
import { SubtypeRepository } from './infraestructure/repositories/subtype.repository';
import { ItemDomainService } from './domain/services/item-domain.service';
import { CreateItemUseCase } from './application/use-cases/create-item.use-case';
import { UpdateItemUseCase } from './application/use-cases/update-item.use-case';
import { FindOneItemUseCase } from './application/use-cases/find-one-item.use-case';
import { FindAllItemUseCase } from './application/use-cases/find-all-item.use-case';
import { DeleteItemUseCase } from './application/use-cases/delete-item.use-case';
import { FindOneTypeUseCase } from './application/use-cases/find-one-type.use-case';
import { FindOneSubtypeUseCase } from './application/use-cases/find-one-subtype.use-case';
import { FindOnePresentationUseCase } from './application/use-cases/find-one-presentation.use-case';
import { FindOneDosageUseCase } from './application/use-cases/find-one-dosage.use-case';
import { UserModule } from '../user/user.module';
import { SharedModule } from 'src/shared/shared.module';
import { ItemProtectedController } from './infraestructure/controllers/item-protected.controller';
import { ItemPublicController } from './infraestructure/controllers/item-public.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      DosageEntity,
      PresentationEntity,
      TypeEntity,
      SubtypeEntity,
    ]),
    UserModule,
    SharedModule,
  ],
  controllers: [ItemProtectedController, ItemPublicController],
  providers: [
    {
      provide: IItemRepository,
      useClass: ItemRepository,
    },
    {
      provide: IDosageRepository,
      useClass: DosageRepository,
    },
    {
      provide: IPresentationRepository,
      useClass: PresentationRepository,
    },
    {
      provide: ITypeRepository,
      useClass: TypeRepository,
    },
    {
      provide: ISubtypeRepository,
      useClass: SubtypeRepository,
    },
    ItemDomainService,
    CreateItemUseCase,
    UpdateItemUseCase,
    FindOneItemUseCase,
    FindAllItemUseCase,
    DeleteItemUseCase,
    FindOneTypeUseCase,
    FindOneSubtypeUseCase,
    FindOnePresentationUseCase,
    FindOneDosageUseCase,
  ],
  exports: [FindOneItemUseCase],
})
export class ItemModule {}
