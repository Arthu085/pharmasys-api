import { BaseEntity } from 'src/core/database/entities/base.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TransferReasonEntity } from './transfer-reason.entity';
import { TransferStatusEnum } from 'src/modules/transfer-request/domain/enums/transfer-status.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { TransferRequestDate } from '../value-objects/transfer-request-date.vo';
import { TransferRequestItemEntity } from './transfer-request-item.entity';

@Entity('transfer_request', {
  comment: 'Tabela para cadastro de pedidos de transferência de estoque',
})
@Index(['origin', 'destination', 'requestDate', 'statusTransfer', 'reason'])
export class TransferRequestEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'origin_id' })
  @Index()
  origin: StockLocationEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'destination_id' })
  @Index()
  destination: StockLocationEntity;

  @Column({
    type: 'timestamptz',
    name: 'request_date',
    comment: 'Data do pedido de transferência selecionada pelo usuário',
  })
  @Index()
  requestDate: Date;

  @ManyToOne(() => TransferReasonEntity)
  @JoinColumn({ name: 'transfer_reason_id' })
  @Index()
  reason: TransferReasonEntity;

  @Column({
    type: 'enum',
    enum: TransferStatusEnum,
    default: TransferStatusEnum.PENDENTE,
    name: 'transfer_status',
    comment: 'Status do pedido de transferência',
  })
  @Index()
  statusTransfer: TransferStatusEnum;

  @OneToMany(() => TransferRequestItemEntity, (item) => item.transferRequest)
  items: TransferRequestItemEntity[];

  changeOrigin(origin: StockLocationEntity): void {
    this.origin = origin;
  }

  changeDestination(destination: StockLocationEntity): void {
    this.destination = destination;
  }

  changeRequestDate(requestDate: TransferRequestDate): void {
    this.requestDate = requestDate.getValue();
  }

  changeReason(reason: TransferReasonEntity): void {
    this.reason = reason;
  }
}
