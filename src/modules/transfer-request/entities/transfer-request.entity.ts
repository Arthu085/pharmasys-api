import { BaseEntity } from 'src/common/entities/base.entity';
import { StockLocation } from 'src/modules/stock-location/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { TransferReason } from './transfer-reason.entity';
import { TransferStatusEnum } from 'src/modules/transfer-request/enums/transfer-status.enum';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('transfer_request', {
  comment: 'Tabela para cadastro de pedidos de transferência de estoque',
})
export class TransferRequest extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'central_stock_id' })
  @Index()
  centralStock: StockLocation;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'destination_id' })
  @Index()
  destination: StockLocation;

  @Column({
    type: 'timestamptz',
    name: 'request_date',
    comment: 'Data do pedido de transferência selecionada pelo usuário',
  })
  @Index()
  requestDate: Date;

  @ManyToOne(() => TransferReason, { eager: true })
  @JoinColumn({ name: 'transfer_reason_id' })
  @Index()
  reason: TransferReason;

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
