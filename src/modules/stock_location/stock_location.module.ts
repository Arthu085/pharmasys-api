import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocation } from './entities/stock_location.entity';
import { StockLocationController } from './controllers/stock_location.controller';
import { StockLocationService } from './services/stock_location.service';
import { StockLocationRepository } from './repositories/stock_location.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StockLocation])],
  controllers: [StockLocationController],
  providers: [StockLocationRepository, StockLocationService],
  exports: [StockLocationService],
})
export class StockLocationModule {}
