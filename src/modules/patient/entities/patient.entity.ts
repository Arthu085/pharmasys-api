import { BaseEntity } from 'src/core/database/entities/base.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('patient', { comment: 'Tabela para cadastro de pacientes' })
@Index(['name', 'document'])
export class PatientEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({ length: 150, comment: 'Nome do paciente' })
  @Index()
  name: string;

  @Column({ length: 14, unique: true, comment: 'Documento do paciente' })
  document: string;
}
