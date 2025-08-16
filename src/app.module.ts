import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ItemModule } from './modules/items/item.module';
import { CompanyModule } from './modules/companies/company.module';
import { StockLocationModule } from './modules/stock_location/stock_location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    ItemModule,
    CompanyModule,
    StockLocationModule,
  ],
})
export class AppModule {}
