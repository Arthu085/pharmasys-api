import { Column, Entity } from 'typeorm';

import { BaseEntity } from 'src/core/database/entities/base.entity';

@Entity('role', { comment: 'Tabela para cadastro de funções' })
export class RoleEntity extends BaseEntity {
  @Column({ length: 50, unique: true, comment: 'Nome da função' })
  name: string;
}
