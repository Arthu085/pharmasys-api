import { BaseEntity } from 'src/common/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('role', { comment: 'Tabela para cadastro de funções' })
export class Role extends BaseEntity {
  @Column({ length: 50, unique: true, comment: 'Nome da função' })
  name: string;
}
