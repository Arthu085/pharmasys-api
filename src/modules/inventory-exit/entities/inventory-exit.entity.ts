import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ExitItemType } from './exit-item-type.entity';

@Entity('inventory_exit', {
  comment: 'Tabela para cadastro de dados de saída de item',
})
@Index(['exitDate', 'exitType'])
export class InventoryExit extends BaseEntity {
  @Column({
    type: 'timestamptz',
    name: 'exit_date',
    comment: 'Data de saída informada pelo usuário',
  })
  @Index()
  exitDate: Date;

  @ManyToOne(() => ExitItemType, { eager: true })
  @JoinColumn({ name: 'exit_type_id' })
  @Index()
  exitType: ExitItemType;

  @Column({ type: 'text', comment: 'Anotações da saída' })
  notes: string;
}
