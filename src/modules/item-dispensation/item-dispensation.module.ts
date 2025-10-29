import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemDispensationEntity } from './entities/item-dispensation.entity';
import { ItemDispensationItemEntity } from './entities/item-dispensation-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ItemDispensationEntity,
      ItemDispensationItemEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class ItemDispensationModule {}
