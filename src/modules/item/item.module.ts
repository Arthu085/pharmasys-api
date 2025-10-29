import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemEntity } from './entities/item.entity';
import { UserEntity } from '../user/entities/user.entity';
import { DosageEntity } from './entities/dosage.entity';
import { TypeEntity } from './entities/type.entity';
import { SubtypeEntity } from './entities/subtype.entity';
import { PresentationEntity } from './entities/presentation.entity';
import { ItemController } from './controllers/item.controller';
import { ItemRepository } from './repositories/item.repository';
import { DosageRepository } from './repositories/dosage.repository';
import { TypeRepository } from './repositories/type.repository';
import { SubtypeRepository } from './repositories/subtype.repository';
import { PresentationRepository } from './repositories/presentation.repository';
import { ItemService } from './services/item.service';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { RoleRepository } from '../user/repositories/role.repository';
import { RoleEntity } from '../user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemEntity,
      UserEntity,
      DosageEntity,
      TypeEntity,
      SubtypeEntity,
      PresentationEntity,
      RoleEntity,
    ]),
  ],
  controllers: [ItemController],
  providers: [
    ItemRepository,
    DosageRepository,
    TypeRepository,
    SubtypeRepository,
    PresentationRepository,
    UserRepository,
    RoleRepository,
    ItemService,
    UserService,
  ],
  exports: [ItemService],
})
export class ItemModule {}
