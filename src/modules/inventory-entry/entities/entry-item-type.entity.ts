import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('entry_item_type', {
  comment: 'Tabela para cadastro dos tipos de entrada de item',
})
export class EntryItemType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;
}
