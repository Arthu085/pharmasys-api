import { BaseEntity } from 'src/core/database/entities/base.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TransferReasonEntity } from './transfer-reason.entity';
import { TransferStatusEnum } from 'src/modules/transfer-request/enums/transfer-status.enum';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Entity('transfer_request', {
  comment: 'Tabela para cadastro de pedidos de transferência de estoque',
})
export class TransferRequestEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => StockLocationEntity, { eager: true })
  @JoinColumn({ name: 'central_stock_id' })
  @Index()
  centralStock: StockLocationEntity;

  @ManyToOne(() => StockLocationEntity, { eager: true })
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

  @ManyToOne(() => TransferReasonEntity, { eager: true })
  @JoinColumn({ name: 'transfer_reason_id' })
  @Index()
  reason: TransferReasonEntity;

  @Column({
    type: 'enum',
    enum: TransferStatusEnum,
    default: TransferStatusEnum.PENDENTE,
    name: 'transfer_status',
    comment:
      'Status do pedido de transferência (P-Pendente, S-Separação, C-Concluído, N-Negado)',
  })
  @Index()
  statusTransfer: TransferStatusEnum;
}
