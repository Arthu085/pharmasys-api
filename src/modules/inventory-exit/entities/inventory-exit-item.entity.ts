import { BaseEntity } from 'src/core/database';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { BatchEntity } from 'src/modules/batch/entities/batch.entity';
import { InventoryExitEntity } from './inventory-exit.entity';

@Entity('inventory-exit-item', {
  comment: 'Tabela para cadastro de dados do item na saída',
})
export class InventoryExitItemEntity extends BaseEntity {
  @ManyToOne(() => InventoryExitEntity, { eager: true })
  @JoinColumn({ name: 'inventory_exit_id' })
  @Index()
  inventoryExit: InventoryExitEntity;

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
