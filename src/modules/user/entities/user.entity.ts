import { BaseEntity } from 'src/common/entites/base.entity';
import { StatusEnum } from '../../../shared/enums/status.enum';
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
export class User extends BaseEntity {
  @Column({ length: 100 })
  name: string;

  @Column({ unique: true, length: 200 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'user_status',
  })
  userStatus: StatusEnum;

  @Column({ type: 'integer', nullable: true, name: 'user_updated_id' })
  userUpdated: number | null;
}
