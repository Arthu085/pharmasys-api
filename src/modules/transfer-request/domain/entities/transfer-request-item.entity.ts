import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { TransferRequestEntity } from './transfer-request.entity';
import { TransferStatusItemEnum } from '../enums/transfer-status-item.enum';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { TransferRequestItemQuantity } from '../value-objects/transfer-request-item-quantity.vo';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Entity('transfer_request_item', {
  comment:
    'Tabela para cadastro de dados do item no pedido de transferência de estoque',
})
@Index(['transferRequest', 'item', 'batch', 'statusTransferItem'])
export class TransferRequestItemEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => TransferRequestEntity)
  @JoinColumn({ name: 'transfer_request_id' })
  @Index()
  transferRequest: TransferRequestEntity;

  @ManyToOne(() => ItemEntity)
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => BatchEntity)
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: BatchEntity;

  @Column({
    type: 'enum',
    enum: TransferStatusItemEnum,
    default: TransferStatusItemEnum.ABERTO,
    name: 'transfer_status',
    comment: 'Status do item do pedido de transferência',
  })
  @Index()
  statusTransferItem: TransferStatusItemEnum;

  @Column({
    type: 'int4',
    comment: 'Quantidade de cada item',
  })
  quantity: number;

  changeItem(item: ItemEntity): void {
    this.item = item;
  }

  changeBatch(batch: BatchEntity): void {
    this.batch = batch;
  }

  changeQuantity(quantity: TransferRequestItemQuantity): void {
    this.quantity = quantity.getValue();
  }
}
