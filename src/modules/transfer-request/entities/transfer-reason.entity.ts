import { BaseEntity } from 'src/core/database';
import { Column, Entity } from 'typeorm';

@Entity('transfer_reason', {
  comment: 'Tabela para cadastro dos motivos de transferência',
})
export class TransferReasonEntity extends BaseEntity {
  @Column({
    length: 150,
    unique: true,
    comment: 'Nome das razões de transferência',
  })
  name: string;
}
