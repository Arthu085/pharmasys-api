import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('advice', {
  comment: 'Tabela para o cadastro de conselho profissional',
})
export class Advice extends BaseEntity {
  @Column({ length: 10, unique: true, comment: 'Código do conselho' })
  acronym: string;

  @Column({ length: 100, comment: 'Descrição do conselho' })
  full_name: string;
}
