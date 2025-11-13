import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './core/config/typeorm.config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { StockLocationModule } from './modules/stock-location/stock-location.module';
import { PrescriptorModule } from './modules/prescriptor/prescriptor.module';
// import { ItemModule } from './modules/item/item.module';
// import { CompanyModule } from './modules/company/company.module';
// import { PatientModule } from './modules/patient/patient.module';
// import { StockBalanceModule } from './modules/stock-balance/stock-balance.module';
// import { BatchModule } from './modules/batch/batch.module';
// import { InventoryEntryModule } from './modules/inventory-entry/inventory-entry.module';
// import { StockTransferModule } from './modules/stock-transfer/stock-transfer.module';
// import { TransferRequestModule } from './modules/transfer-request/transfer-request.module';
// import { ItemDispensationModule } from './modules/item-dispensation/item-dispensation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    StockLocationModule,
    PrescriptorModule,
    // ItemModule,
    // CompanyModule,
    // PatientModule,
    // StockBalanceModule,
    // BatchModule,
    // InventoryEntryModule,
    // StockTransferModule,
    // TransferRequestModule,
    // ItemDispensationModule,
  ],
})
export class AppModule {}
