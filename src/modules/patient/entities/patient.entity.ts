import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity('patient', { comment: 'Tabela para cadastro de pacientes' })
@Index(['name', 'document'])
export class Patient extends BaseEntity {
  @Column({ length: 150, comment: 'Nome do paciente' })
  @Index()
  name: string;

  @Column({ length: 14, unique: true, comment: 'Documento do paciente' })
  document: string;
}
