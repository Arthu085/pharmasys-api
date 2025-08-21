import { StatusEnum } from '../../../shared/status.enum';
import { Role } from './role.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 200 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @ManyToOne(() => Role, { eager: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'user_status',
  })
  userStatus: StatusEnum;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: true,
  })
  updatedAt: Date | null;

  @Column({ type: 'integer', nullable: true, name: 'user_updated_id' })
  userUpdated: number | null;
}
