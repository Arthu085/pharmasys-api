import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryEntryEntity } from './domain/entities/inventory-entry.entity';
import { InventoryEntryItemEntity } from './domain/entities/inventory-entry-item.entity';
import { EntryItemTypeEntity } from './domain/entities/entry-item-type.entity';

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
