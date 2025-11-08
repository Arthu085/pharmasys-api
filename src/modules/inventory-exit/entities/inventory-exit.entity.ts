import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { ExitItemTypeEntity } from './exit-item-type.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Entity('inventory_exit', {
  comment: 'Tabela para cadastro de dados de saída de item',
})
@Index(['exitDate', 'exitType'])
export class InventoryExitEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({
    type: 'timestamptz',
    name: 'exit_date',
    comment: 'Data de saída informada pelo usuário',
  })
  @Index()
  exitDate: Date;

  @ManyToOne(() => ExitItemTypeEntity, { eager: true })
  @JoinColumn({ name: 'exit_type_id' })
  @Index()
  exitType: ExitItemTypeEntity;

  @Column({ type: 'text', comment: 'Anotações da saída' })
  notes: string;
}
