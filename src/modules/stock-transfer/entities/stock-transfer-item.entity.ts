import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from 'src/modules/item/entities/item.entity';
import { Batch } from 'src/modules/batch/entities/batch.entity';
import { StockTransfer } from './stock-transfer.entity';

@Entity('stock_transfer_item', {
  comment: 'Tabela para cadastro de dados do item na trasnferência de estoque',
})
export class StockTransferItem extends BaseEntity {
  @ManyToOne(() => StockTransfer, { eager: true })
  @JoinColumn({ name: 'stock_transfer_id' })
  @Index()
  stockTransfer: StockTransfer;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: Item;

  @ManyToOne(() => Batch, { eager: true })
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: Batch;

  @Column({
    type: 'int4',
    comment: 'Quantidade de cada item',
  })
  quantity: number;
}
