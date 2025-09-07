import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from 'src/modules/item/entities/item.entity';
import { TransferRequest } from './transfer-request.entity';
import { TransferStatusItemEnum } from '../enums/transfer-status-item.enum';

@Entity('transfer_request_item', {
  comment:
    'Tabela para cadastro de dados do item no pedido de trasnferência de estoque',
})
export class TransferRequestItem extends BaseEntity {
  @ManyToOne(() => TransferRequest, { eager: true })
  @JoinColumn({ name: 'transfer_request_id' })
  @Index()
  transferRequest: TransferRequest;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: Item;

  @Column({
    type: 'enum',
    enum: TransferStatusItemEnum,
    default: TransferStatusItemEnum.ABERTO,
    name: 'transfer_status',
    comment:
      'Status do  item do pedido de transferência (A-Aberto, S-Separação, F-Finalizado, C-Cancelado)',
  })
  @Index()
  statusTransfer: TransferStatusItemEnum;

  @Column({
    type: 'int4',
    comment: 'Quantidade de cada item',
  })
  quantity: number;
}
