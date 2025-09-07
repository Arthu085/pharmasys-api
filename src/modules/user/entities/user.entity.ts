import { StatusEnum } from '../../../shared/enums/status.enum';
import { Role } from './role.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user', { comment: 'Tabela para cadastro de usuários' })
@Index(['name', 'email', 'role'])
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date | null;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ATIVO,
    name: 'status',
    comment: 'Status do usuário',
  })
  @Index()
  status: StatusEnum;

  @Column({ type: 'integer', nullable: true, name: 'user_updated_id' })
  userUpdated: number | null;

  @Column({ length: 100, comment: 'Nome do usuário' })
  @Index()
  name: string;

  @Column({ unique: true, length: 200, comment: 'Email do usuário' })
  email: string;

  @Column({ length: 255, comment: 'Senha do usuário' })
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  @Index()
  role: Role;
}
