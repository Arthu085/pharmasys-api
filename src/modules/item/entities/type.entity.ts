import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('type', { comment: 'Tabela para cadastro de tipos de item' })
export class TypeEntity extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome do tipo' })
  name: string;
}
