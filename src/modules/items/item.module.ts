import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { ItemRepository } from './repositories/item.repository';
import { ItemController } from './controllers/item.controller';
import { ItemService } from './services/item.service';
import { Dosage } from './entities/dosage.entity';
import { Presentation } from './entities/presentation.entity';
import { Type } from './entities/type.entity';
import { Subtype } from './entities/subtype.entity';
import { PresentationRepository } from './repositories/presentation.repository';
import { DosageRepository } from './repositories/dosage.repository';
import { TypeRepository } from './repositories/type.repository';
import { SubtypeRepository } from './repositories/subtype.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, Dosage, Presentation, Type, Subtype]),
  ],
  controllers: [ItemController],
  providers: [
    ItemRepository,
    ItemService,
    PresentationRepository,
    DosageRepository,
    TypeRepository,
    SubtypeRepository,
  ],
  exports: [ItemService],
})
export class ItemModule {}
