import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemDispensation } from './entities/item-dispensation.entity';
import { ItemDispensationItem } from './entities/item-dispensation-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItemDispensation, ItemDispensationItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class ItemDispensationModule {}
