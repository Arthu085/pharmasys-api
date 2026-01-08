import { BaseEntity } from 'src/core/database/entities/base.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { StockBalanceQuantity } from '../value-objects/stock-balance-quantity.vo';

@Entity('stock_balance', { comment: 'Tabela para consulta de estoque' })
@Index(['item', 'batch', 'stockLocation'])
export class StockBalanceEntity extends BaseEntity {
  @ManyToOne(() => ItemEntity)
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => BatchEntity)
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: BatchEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocationEntity;

  @Column({ type: 'int4', comment: 'Quantidade no estoque' })
  quantity: number;

  changeQuantity(quantity: number): void {
    const newQuantity = StockBalanceQuantity.create(quantity);

    this.quantity = newQuantity.getValue();
    this.updatedAt = new Date();
  }

  changeStockLocation(stockLocation: StockLocationEntity): void {
    this.stockLocation = stockLocation;
    this.updatedAt = new Date();
  }
}
