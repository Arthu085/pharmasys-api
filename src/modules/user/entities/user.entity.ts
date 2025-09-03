import { BaseEntity } from 'src/common/entites/base.entity';
import { StatusEnum } from '../../../shared/enums/status.enum';
import { Role } from './role.entity';
import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';

@Entity('user', { comment: 'Tabela para cadastro de usuários' })
export class User extends BaseEntity {
  @Column({ length: 100, comment: 'Nome do usuário' })
  @Index()
  name: string;

  @Column({ unique: true, length: 200, comment: 'Email do usuário' })
  email: string;

  @Column({ length: 255, comment: 'Senha do usuário' })
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'user_status',
    comment: 'Status do usuário',
  })
  @Index()
  userStatus: StatusEnum;

  @Column({ type: 'integer', nullable: true, name: 'user_updated_id' })
  userUpdated: number | null;
}
