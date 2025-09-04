import { Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class TransferReasonType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
    unique: true,
    comment: 'Nome das razões de transferência',
  })
  name: string;
}
