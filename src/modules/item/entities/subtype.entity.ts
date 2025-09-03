import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('subtype', { comment: 'Tabela para cadastro de subtipos' })
export class Subtype extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome do subtipo' })
  name: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
