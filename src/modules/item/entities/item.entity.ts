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
import { Type } from './type.entity';
import { Presentation } from './presentation.entity';
import { Dosage } from './dosage.entity';
import { Subtype } from './subtype.entity';

@Entity('item')
export class Item {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255 })
  name: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;

  @ManyToOne(() => Presentation, { eager: true })
  @JoinColumn({ name: 'presentation_id' })
  presentation: Presentation;

  @ManyToOne(() => Dosage, { eager: true })
  @JoinColumn({ name: 'dosage_id' })
  dosage: Dosage;

  @ManyToOne(() => Subtype, { eager: true })
  @JoinColumn({ name: 'subtype_id' })
  subtype: Subtype | null;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'item_status',
  })
  itemStatus: StatusEnum;

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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated: User | null;
}
