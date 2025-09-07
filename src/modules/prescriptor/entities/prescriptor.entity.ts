import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { Advice } from './advice.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('prescriptor', { comment: 'Tabela para cadastro de prescritores' })
@Index(['name', 'registrationNumber', 'advice'])
export class Prescriptor extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @Column({ length: 150, comment: 'Nome do prescritor' })
  @Index()
  name: string;

  @Column({
    length: 30,
    unique: true,
    comment: 'Número de registro do prescritor no conselho profissional',
    name: 'registration_number',
  })
  @Index()
  registrationNumber: string;

  @ManyToOne(() => Advice, { eager: true })
  @JoinColumn({ name: 'advice_id' })
  @Index()
  advice: Advice;

  @Column({
    type: 'varchar',
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
