import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('presentation')
export class Presentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;
}
