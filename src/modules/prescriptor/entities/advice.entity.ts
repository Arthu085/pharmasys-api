import { BaseEntity } from 'src/core/database';
import { Column, Entity } from 'typeorm';

@Entity('advice', {
  comment: 'Tabela para o cadastro dos conselhos profissionais',
})
export class AdviceEntity extends BaseEntity {
  @Column({ length: 10, unique: true, comment: 'Código do conselho' })
  acronym: string;

  @Column({ length: 100, comment: 'Descrição do conselho', name: 'full_name' })
  fullName: string;
}
