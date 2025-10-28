import { TransferReasonType } from 'src/common/entities/transfer-reason-type.entity';
import { Entity } from 'typeorm';

@Entity('transfer_reason', {
  comment: 'Tabela para cadastro dos motivos de transferência',
})
export class TransferReason extends TransferReasonType {}
