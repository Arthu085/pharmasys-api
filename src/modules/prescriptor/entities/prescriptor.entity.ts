import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Advice } from './advice.entity';

@Entity('prescriptor', { comment: 'Tabela para cadastro de prescritores' })
@Index(['name', 'registration_number', 'advice'])
export class Prescriptor extends BaseEntity {
  @Column({ length: 150, comment: 'Nome do prescritor' })
  @Index()
  name: string;

  @Column({
    length: 30,
    unique: true,
    comment: 'Número de registro do prescritor no conselho profissional',
  })
  registration_number: string;

  @ManyToOne(() => Advice, { eager: true })
  @JoinColumn({ name: 'advice_id' })
  @Index()
  advice: Advice;

  @Column({
    length: 150,
    nullable: true,
    comment: 'Especialidade do prescritor',
  })
  specialty?: string | null;

  @Column({
    length: 2,
    type: 'char',
    comment: 'UF do conselho profissional',
  })
  state: string;
}
