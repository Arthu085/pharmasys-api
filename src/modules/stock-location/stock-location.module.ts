import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockLocation } from './entities/stock-location.entity';
import { StockLocationController } from './controllers/stock-location.controller';
import { StockLocationRepository } from './repositories/stock-location.repository';
import { StockLocationService } from './services/stock-location.service';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/services/user.service';
import { UserRepository } from '../user/repositories/user.repository';
import { RoleRepository } from '../user/repositories/role.repository';
import { Role } from '../user/entities/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockLocation, User, Role])],
  controllers: [StockLocationController],
  providers: [
    StockLocationRepository,
    UserRepository,
    RoleRepository,
    StockLocationService,
    UserService,
  ],
  exports: [StockLocationService],
})
export class StockLocationModule {}
