import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferReasonEntity } from './entities/transfer-reason.entity';
import { TransferRequestEntity } from './entities/transfer-request.entity';
import { TransferRequestItemEntity } from './entities/transfer-request-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransferReasonEntity,
      TransferRequestEntity,
      TransferRequestItemEntity,
    ]),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class TransferRequestModule {}
