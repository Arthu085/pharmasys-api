import { GlobalStatusEnum } from 'src/common/enums/global.status.enum';
import { Role } from 'src/modules/users/entities/role.entity';
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

  @Column({ length: 1, default: GlobalStatusEnum.A, name: 'user_status' })
  userStatus: GlobalStatusEnum;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: null, name: 'updated_at' })
  updatedAt: Date;

  @Column()
  userUpdated: number;
}
