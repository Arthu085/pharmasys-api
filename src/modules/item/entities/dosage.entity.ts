import { BaseEntity } from 'src/core/database';
import { Column, Entity } from 'typeorm';

@Entity('dosage', { comment: 'Tabela para cadastro de dosagens de item' })
export class DosageEntity extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Formato da dosagem' })
  format: string;
}
