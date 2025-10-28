import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  Generated,
} from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
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
    comment: 'Status da entidade (A-Ativo, I-Inativo)',
  })
  @Index()
  status: StatusEnum;
}
