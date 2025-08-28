import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { User } from '../user/entities/user.entity';
import { Dosage } from './entities/dosage.entity';
import { Type } from './entities/type.entity';
import { Subtype } from './entities/subtype.entity';
import { Presentation } from './entities/presentation.entity';
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
import { Role } from '../user/entities/role.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Item,
      User,
      Dosage,
      Type,
      Subtype,
      Presentation,
      Role,
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
