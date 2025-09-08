import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ExitItemType } from './exit-item-type.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('inventory_exit', {
  comment: 'Tabela para cadastro de dados de saída de item',
})
@Index(['exitDate', 'exitType'])
export class InventoryExit extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

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
