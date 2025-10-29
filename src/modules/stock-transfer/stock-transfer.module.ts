import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransferEntity } from './entities/stock-transfer.entity';
import { StockTransferItemEntity } from './entities/stock-transfer-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTransferEntity, StockTransferItemEntity]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockTransferModule {}
