import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('type', { comment: 'Tabela para cadastro de tipos de item' })
export class Type extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome do tipo' })
  name: string;
}
