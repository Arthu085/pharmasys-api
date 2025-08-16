import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('stock_location')
export class StockLocation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 50 })
  code: string;

  @Column({ default: false })
  is_central_stock: boolean;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user?: User | null;

  @Column({ name: 'user_id' })
  user_id?: number | null;
}
