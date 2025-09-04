import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferReason } from './entities/transfer-reason.entity';
import { TransferRequest } from './entities/transfer-request.entity';
import { TransferRequestItem } from './entities/transfer-request-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransferReason,
      TransferRequest,
      TransferRequestItem,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TransferRequestModule {}
