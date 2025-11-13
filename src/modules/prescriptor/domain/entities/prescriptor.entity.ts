import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { AdviceEntity } from './advice.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';

@Entity('prescriptor', { comment: 'Tabela para cadastro de prescritores' })
@Index(['name', 'registrationNumber', 'advice'])
@Index(
  'IDX_prescriptor_registration_advice_unique_when_not_deleted',
  ['registrationNumber', 'advice'],
  {
    unique: true,
    where: '"deleted_at" IS NULL',
  },
)
export class PrescriptorEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
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

  @ManyToOne(() => AdviceEntity)
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
