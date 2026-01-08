import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { InventoryEntryEntity } from './inventory-entry.entity';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';

@Entity('inventory_entry_item', {
  comment: 'Tabela para cadastro de dados do item na entrada',
})
export class InventoryEntryItemEntity extends BaseEntity {
  @ManyToOne(() => InventoryEntryEntity)
  @JoinColumn({ name: 'inventory_entry_id' })
  @Index()
  inventoryEntry: InventoryEntryEntity;

  @ManyToOne(() => ItemEntity)
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => BatchEntity)
  @JoinColumn({ name: 'batch_id' })
  @Index()
  batch: BatchEntity;

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
