import { TransferReasonType } from 'src/common/entites/transfer-reason-type.entity';
import { Entity } from 'typeorm';

@Entity('transfer_reason')
export class TransferReason extends TransferReasonType {}
