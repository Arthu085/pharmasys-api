import { BaseEntity } from 'src/core/database/entities/base.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { EntryItemTypeEntity } from './entry-item-type.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { InventoryEntryItemEntity } from './inventory-entry-item.entity';

@Entity('inventory_entry', {
  comment: 'Tabela para cadastro de dados de entrada de item',
})
@Index(['invoiceNumber', 'entryDate'])
export class InventoryEntryEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({
    type: 'varchar',
    name: 'invoice_number',
    length: 70,
    nullable: true,
    comment: 'Número da nota fiscal',
  })
  @Index()
  invoiceNumber?: string | null;

  @Column({
    type: 'timestamptz',
    name: 'entry_date',
    comment: 'Data de entrada informada pelo usuário',
  })
  @Index()
  entryDate: Date;

  @ManyToOne(() => EntryItemTypeEntity)
  @JoinColumn({ name: 'entry_type_id' })
  @Index()
  entryType: EntryItemTypeEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocationEntity;

  @Column({
    type: 'decimal',
    name: 'total_value',
    comment: 'Valor total se é nota fiscal',
    nullable: true,
    precision: 12,
    scale: 2,
  })
  totalValue?: number | null;

  @OneToMany(() => InventoryEntryItemEntity, (item) => item.inventoryEntry)
  items: InventoryEntryItemEntity[];
}
