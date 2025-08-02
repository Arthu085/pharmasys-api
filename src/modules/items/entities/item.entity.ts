import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from './type.entity';
import { Presentation } from './presentation.entity';
import { Dosage } from './dosage.entity';
import { Subtype } from './subtype.entity';
import { User } from 'src/modules/users/entities/user.entity';

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

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  user_id: number;
}
