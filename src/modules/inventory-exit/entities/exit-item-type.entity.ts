import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('exit_item_type', {
  comment: 'Tabela para cadastro dos tipos de saída de item',
})
export class ExitItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;
}
