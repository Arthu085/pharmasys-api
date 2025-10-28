import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('transfer_reason', {
  comment: 'Tabela para cadastro dos motivos de transferência',
})
export class TransferReason {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
    unique: true,
    comment: 'Nome das razões de transferência',
  })
  name: string;
}
