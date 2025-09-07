import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntry } from './entities/inventory-entry.entity';
import { InventoryEntryItem } from './entities/inventory-entry-item.entity';
import { EntryItemType } from './entities/entry-item-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryEntry,
      InventoryEntryItem,
      EntryItemType,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class InventoryEntryModule {}
