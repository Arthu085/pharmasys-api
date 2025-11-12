import { BaseEntity } from 'src/core/database/entities/base.entity';
import { BatchEntity } from 'src/modules/batch/entities/batch.entity';
import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_balance', { comment: 'Tabela para consulta de estoque' })
@Index(['item', 'batch', 'stockLocation'])
export class StockBalanceEntity extends BaseEntity {
  @ManyToOne(() => ItemEntity, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => BatchEntity, { eager: true })
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: BatchEntity;

  @ManyToOne(() => StockLocationEntity, { eager: true })
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocationEntity;

  @Column({ type: 'int4', comment: 'Quantidade no estoque' })
  quantity: number;
}
