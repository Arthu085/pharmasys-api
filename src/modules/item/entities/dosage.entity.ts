import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('dosage')
export class Dosage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  format: string;
}
