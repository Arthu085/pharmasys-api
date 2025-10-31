import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { TypeEntity } from './type.entity';
import { BaseEntity } from 'src/core/database';

@Entity('subtype', { comment: 'Tabela para cadastro de subtipos de item' })
export class SubtypeEntity extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome do subtipo' })
  name: string;

  @ManyToOne(() => TypeEntity)
  @JoinColumn({ name: 'type_id' })
  type: TypeEntity;
}
