import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('presentation')
export class Presentation extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;
}
