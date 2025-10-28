import { InventoryTypes } from 'src/common/entities/inventory-type.entity';
import { Entity } from 'typeorm';

@Entity('exit_item_type', {
  comment: 'Tabela para cadastro dos tipos de saída de item',
})
export class ExitItemType extends InventoryTypes {}
