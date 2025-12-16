import { UUID } from 'crypto';
import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Column,
  Index,
  Generated,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({ comment: 'Identificador único da entidade' })
  id: number;

  @Generated('uuid')
  @Column({
    type: 'uuid',
    name: 'uuid',
    nullable: false,
    unique: true,
    comment: 'Identificador único universal',
  })
  @Index()
  uuid: UUID;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    comment: 'Data de criação da entidade',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data de atualização da entidade',
  })
  updatedAt: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamptz',
    nullable: true,
    comment: 'Data de exclusão da entidade',
  })
  deletedAt: Date | null;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.ATIVO,
    name: 'status',
    comment: 'Status da entidade (A-Ativo, I-Inativo)',
  })
  @Index()
  status: StatusEnum;
}
