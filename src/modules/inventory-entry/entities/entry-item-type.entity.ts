import { InventoryTypes } from 'src/common/entites/inventory-type.entity';
import { Entity } from 'typeorm';

@Entity('entry_item_type', {
  comment: 'Tabela para cadastro dos tipos de entrada de item',
})
export class EntryItemType extends InventoryTypes {}
