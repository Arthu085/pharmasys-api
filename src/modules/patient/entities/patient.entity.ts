import { BaseEntity } from 'src/core/database/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('patient', { comment: 'Tabela para cadastro de pacientes' })
@Index(['name', 'document'])
export class Patient extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @Column({ length: 150, comment: 'Nome do paciente' })
  @Index()
  name: string;

  @Column({ length: 14, unique: true, comment: 'Documento do paciente' })
  document: string;
}
