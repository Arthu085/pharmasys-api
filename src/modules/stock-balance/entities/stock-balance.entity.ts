import { BaseEntity } from 'src/common/entities/base.entity';
import { Batch } from 'src/modules/batch/entities/batch.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { StockLocation } from 'src/modules/stock-location/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_balance', { comment: 'Tabela para consulta de estoque' })
@Index(['item', 'batch', 'stockLocation'])
export class StockBalance extends BaseEntity {
  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: Item;

  @ManyToOne(() => Batch, { eager: true })
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: Batch;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocation;

  @Column({ type: 'int4', comment: 'Quantidade no estoque' })
  quantity: number;
}
