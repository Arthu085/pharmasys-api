import { BaseEntity } from 'src/common/entites/base.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { StockLocation } from 'src/modules/stock-location/entities/stock-location.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { EntryItemType } from './entry-item-type.entity';
import { User } from 'src/modules/user/entities/user.entity';

@Entity('inventory_entry', {
  comment: 'Tabela para cadastro de dados de entrada de item',
})
@Index(['invoiceNumber', 'entryDate'])
export class InventoryEntry extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

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

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: Company;

  @ManyToOne(() => EntryItemType, { eager: true })
  @JoinColumn({ name: 'entry_type_id' })
  @Index()
  entryType: EntryItemType;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocation;

  @Column({
    type: 'decimal',
    name: 'total_value',
    comment: 'Valor total se é nota fiscal',
    nullable: true,
    precision: 12,
    scale: 2,
  })
  totalValue?: number;
}
