import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('dosage', { comment: 'Tabela para cadastro de dosagens de item' })
export class Dosage extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Formato da dosagem' })
  format: string;
}
