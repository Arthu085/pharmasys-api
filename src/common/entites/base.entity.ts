import { User } from 'src/modules/user/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

export abstract class BaseEntity {
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
    comment: 'Status da entidade (A-Ativo, I-Inativo)',
  })
  @Index()
  status: StatusEnum;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated?: User | null;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;
}
