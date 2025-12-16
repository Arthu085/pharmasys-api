import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { StockTransferEntity } from './stock-transfer.entity';

@Entity('stock_transfer_item', {
  comment: 'Tabela para cadastro de dados do item na trasnferência de estoque',
})
export class StockTransferItemEntity extends BaseEntity {
  @ManyToOne(() => StockTransferEntity, { eager: true })
  @JoinColumn({ name: 'stock_transfer_id' })
  @Index()
  stockTransfer: StockTransferEntity;

  @ManyToOne(() => ItemEntity, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => BatchEntity, { eager: true })
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: BatchEntity;

  @Column({
    type: 'int4',
    comment: 'Quantidade de cada item',
  })
  quantity: number;
}
