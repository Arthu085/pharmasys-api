import { BaseEntity } from 'src/core/database';
import { Column, Entity } from 'typeorm';

@Entity('entry_item_type', {
  comment: 'Tabela para cadastro dos tipos de entrada de item',
})
export class EntryItemTypeEntity extends BaseEntity {
  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;
}
