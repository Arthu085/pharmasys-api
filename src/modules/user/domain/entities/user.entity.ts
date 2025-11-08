import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  DeleteDateColumn,
} from 'typeorm';

import { StatusEnum } from 'src/shared/enums/status.enum';
import { RoleEntity } from './role.entity';

@Entity('user', { comment: 'Tabela para cadastro de usuários' })
@Index(['name', 'email', 'role'])
@Index('IDX_user_email_unique_when_not_deleted', ['email'], {
  unique: true,
  where: '"deleted_at" IS NULL',
})
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Generated('uuid')
  @Column({
    type: 'uuid',
    name: 'uuid',
    nullable: false,
    comment: 'Identificador único universal',
  })
  uuid: string;

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

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data de exclusão da entidade',
  })
  deletedAt: Date | null;

  @Column({ type: 'integer', nullable: true, name: 'user_updated_id' })
  userUpdated: number | null;

  @Column({ length: 100, comment: 'Nome do usuário' })
  @Index()
  name: string;

  @Column({ length: 200, comment: 'Email do usuário' })
  email: string;

  @Column({ length: 255, comment: 'Senha do usuário' })
  password: string;

  @ManyToOne(() => RoleEntity)
  @JoinColumn({ name: 'role_id' })
  @Index()
  role: RoleEntity;
}
