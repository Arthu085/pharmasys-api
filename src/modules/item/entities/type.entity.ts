import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('type')
export class Type extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;
}
