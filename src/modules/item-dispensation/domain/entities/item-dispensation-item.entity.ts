import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ItemEntity } from 'src/modules/item/domain/entities/item.entity';
import { ItemDispensationEntity } from './item-dispensation.entity';
import { BatchEntity } from 'src/modules/batch/domain/entities/batch.entity';

@Entity('item_dispensation_item', {
  comment: 'Tabela para cadastro de dados do item na dispensação',
})
export class ItemDispensationItemEntity extends BaseEntity {
  @ManyToOne(() => ItemDispensationEntity, { eager: true })
  @JoinColumn({ name: 'item_dispensation_id' })
  @Index()
  itemDispensation: ItemDispensationEntity;

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
