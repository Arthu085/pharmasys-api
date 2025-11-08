// import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { StockLocationEntity } from './entities/stock-location.entity';
// import { StockLocationController } from './controllers/stock-location.controller';
// import { StockLocationRepository } from './repositories/stock-location.repository';
// import { StockLocationService } from './services/stock-location.service';
// import { UserEntity } from '../user/domain/entities/user.entity';
// import { UserService } from '../user/domain/services/user-domainOLD.service';
// import { UserRepository } from '../user/infrastructure/repositories/user.repository';
// import { RoleRepository } from '../user/infrastructure/repositories/role.repository';
// import { RoleEntity } from '../user/domain/entities/role.entity';

// @Module({
//   imports: [
//     TypeOrmModule.forFeature([StockLocationEntity, UserEntity, RoleEntity]),
//   ],
//   controllers: [StockLocationController],
//   providers: [
//     StockLocationRepository,
//     UserRepository,
//     RoleRepository,
//     StockLocationService,
//     UserService,
//   ],
//   exports: [StockLocationService],
// })
// export class StockLocationModule {}
