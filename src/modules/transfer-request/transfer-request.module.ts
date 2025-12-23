import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferReasonEntity } from './domain/entities/transfer-reason.entity';
import { TransferRequestEntity } from './domain/entities/transfer-request.entity';
import { TransferRequestItemEntity } from './domain/entities/transfer-request-item.entity';

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
