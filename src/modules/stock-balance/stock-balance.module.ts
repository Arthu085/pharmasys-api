import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockBalance } from './entities/stock-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockBalance])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockBalanceModule {}
