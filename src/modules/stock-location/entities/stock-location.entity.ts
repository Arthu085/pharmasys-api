import { BaseEntity } from 'src/common/entites/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stock_location')
export class StockLocation extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @Column({ length: 50, unique: true })
  code: string;

  @Column({ name: 'is_central_stock', type: 'boolean', default: false })
  isCentralStock: boolean;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'stock_location_status',
  })
  stockLocationStatus: StatusEnum;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated: User | null;
}
