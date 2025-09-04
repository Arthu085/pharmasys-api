import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InventoryExit } from './entities/inventory-exit.entity';
import { InventoryExitItem } from './entities/inventory-exit-item.entity';
import { ExitItemType } from './entities/exit-item-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryExit, InventoryExitItem, ExitItemType]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class InventoryExitModule {}
