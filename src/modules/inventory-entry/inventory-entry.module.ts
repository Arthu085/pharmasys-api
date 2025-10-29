import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntryEntity } from './entities/inventory-entry.entity';
import { InventoryEntryItemEntity } from './entities/inventory-entry-item.entity';
import { EntryItemTypeEntity } from './entities/entry-item-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryEntryEntity,
      InventoryEntryItemEntity,
      EntryItemTypeEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class InventoryEntryModule {}
