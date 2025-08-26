import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StockLocationModule } from './modules/stock-location/stock-location.module';
import { ItemModule } from './modules/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    StockLocationModule,
    ItemModule,
  ],
})
export class AppModule {}
