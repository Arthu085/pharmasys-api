import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dosage')
export class Dosage extends BaseEntity {
  @Column({ length: 100, unique: true })
  format: string;
}
