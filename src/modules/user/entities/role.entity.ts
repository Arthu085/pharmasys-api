import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('role')
export class Role extends BaseEntity {
  @Column({ length: 50, unique: true })
  name: string;
}
