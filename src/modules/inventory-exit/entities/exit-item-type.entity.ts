import { InventoryTypes } from 'src/common/entities/inventory-type.entity';
import { Entity } from 'typeorm';

@Entity('exit_item_type')
export class ExitItemType extends InventoryTypes {}
