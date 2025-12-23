import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryExitEntity } from './domain/entities/inventory-exit.entity';
import { InventoryExitItemEntity } from './domain/entities/inventory-exit-item.entity';
import { ExitItemTypeEntity } from './domain/entities/exit-item-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InventoryExitEntity,
      InventoryExitItemEntity,
      ExitItemTypeEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class InventoryExitModule {}
