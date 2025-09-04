import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { InventoryEntry } from './inventory-entry.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { Batch } from 'src/modules/batch/entities/batch.entity';

@Entity('inventory_entry_item', {
  comment: 'Tabela para cadastro de dados do item na entrada',
})
export class InventoryEntryItem extends BaseEntity {
  @ManyToOne(() => InventoryEntry, { eager: true })
  @JoinColumn({ name: 'inventory_entry_id' })
  @Index()
  inventoryEntry: InventoryEntry;

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

  @Column({
    type: 'decimal',
    name: 'unit_price',
    precision: 12,
    scale: 2,
    comment: 'Valor de cada item',
  })
  unitPrice: number;
}
