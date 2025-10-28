import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Type } from './type.entity';
import { BaseEntity } from 'src/core/database/entities/base.entity';

@Entity('subtype', { comment: 'Tabela para cadastro de subtipos de item' })
export class Subtype extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome do subtipo' })
  name: string;

  @ManyToOne(() => Type)
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
