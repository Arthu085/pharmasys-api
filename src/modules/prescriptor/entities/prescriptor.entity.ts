import { BaseEntity } from 'src/core/database';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AdviceEntity } from './advice.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';

@Entity('prescriptor', { comment: 'Tabela para cadastro de prescritores' })
@Index(['name', 'registrationNumber', 'advice'])
export class PrescriptorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 150, comment: 'Nome do prescritor' })
  @Index()
  name: string;

  @Column({
    length: 30,
    comment: 'Número de registro do prescritor no conselho profissional',
    name: 'registration_number',
  })
  @Index()
  registrationNumber: string;

  @ManyToOne(() => AdviceEntity, { eager: true })
  @JoinColumn({ name: 'advice_id' })
  @Index()
  advice: AdviceEntity;

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
