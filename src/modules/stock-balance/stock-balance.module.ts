import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockBalanceEntity } from './domain/entities/stock-balance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockBalanceEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class StockBalanceModule {}
