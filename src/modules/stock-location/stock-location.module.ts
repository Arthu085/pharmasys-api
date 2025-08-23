import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocation } from './entities/stock-location.entity';
import { StockLocationController } from './controllers/stock-location.controller';
import { StockLocationRepository } from './repositories/stock-location.repository';
import { StockLocationService } from './services/stock-location.service';
import { UserRepository } from '../user/repositories/user.repository';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockLocation, User])],
  controllers: [StockLocationController],
  providers: [StockLocationRepository, UserRepository, StockLocationService],
  exports: [StockLocationService],
})
export class StockLocationModule {}
