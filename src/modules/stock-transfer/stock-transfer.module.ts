import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockTransfer } from './entities/stock-transfer.entity';
import { StockTransferItem } from './entities/stock-transfer-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockTransfer, StockTransferItem])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockTransferModule {}
