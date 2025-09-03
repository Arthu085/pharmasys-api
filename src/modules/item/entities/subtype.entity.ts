import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Type } from './type.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('subtype')
export class Subtype extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  @ManyToOne(() => Type, { eager: true })
  @JoinColumn({ name: 'type_id' })
  type: Type;
}
