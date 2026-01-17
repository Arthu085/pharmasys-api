import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';
import { InventoryExitEntity } from './inventory-exit.entity';

@Entity('inventory-exit-item', {
  comment: 'Tabela para cadastro de dados do item na saída',
})
@Index(['inventoryExit', 'item', 'batch'])
export class InventoryExitItemEntity extends BaseEntity {
  @ManyToOne(() => InventoryExitEntity)
  @JoinColumn({ name: 'inventory_exit_id' })
  @Index()
  inventoryExit: InventoryExitEntity;

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
}
