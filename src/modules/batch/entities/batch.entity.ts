import { BaseEntity } from 'src/core/database/entities/base.entity';
import { CompanyEntity } from 'src/modules/company/entities/company.entity';
import { ItemEntity } from 'src/modules/item/entities/item.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('batch', { comment: 'Tabela para cadastro de lotes' })
@Index(['item', 'company', 'batchCode'])
export class BatchEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => ItemEntity, { eager: true })
  @JoinColumn({ name: 'item_id' })
  @Index()
  item: ItemEntity;

  @ManyToOne(() => CompanyEntity, { eager: true })
  @JoinColumn({ name: 'company_id' })
  @Index()
  company: CompanyEntity;

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
