import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class InventoryTypes {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;
}
