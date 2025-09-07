import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from 'src/modules/item/entities/item.entity';
import { ItemDispensation } from './item-dispensation.entity';
import { Batch } from 'src/modules/batch/entities/batch.entity';

@Entity('item_dispensation_item', {
  comment: 'Tabela para cadastro de dados do item na dispensação',
})
export class ItemDispensationItem extends BaseEntity {
  @ManyToOne(() => ItemDispensation, { eager: true })
  @JoinColumn({ name: 'item_dispensation_id' })
  @Index()
  itemDispensation: ItemDispensation;

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
    type: 'boolean',
    name: 'is_psychotropic',
    default: false,
    comment: 'Verifica se é psicotrópico ou não',
  })
  isPsychotropic?: boolean;

  @Column({
    length: 50,
    name: 'prescription_notification_number',
    nullable: true,
    comment:
      'Número da notificação da prescrição (é necessário somente se é psicotrópico)',
  })
  prescriptionNotificationNumber?: string;
}
