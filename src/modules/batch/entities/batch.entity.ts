import { BaseEntity } from 'src/common/entites/base.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Item } from 'src/modules/item/entities/item.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('batch', { comment: 'Tabela para cadastro de lotes' })
@Index(['item', 'company', 'batchCode'])
export class Batch extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @ManyToOne(() => Item, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: Item;

  @ManyToOne(() => Company, { eager: true })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: Company;

  @Column({
    length: 90,
    unique: true,
    comment: 'Código do lote',
    name: 'batch_code',
  })
  @Index()
  batchCode: string;

  @Column({
    type: 'date',
    comment: 'Data de expiração',
    name: 'expiration_date',
  })
  expirationDate: Date;
}
