import { BaseEntity } from 'src/core/database/entities/base.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { StockTransferItemEntity } from './stock-transfer-item.entity';

@Entity('stock_transfer', {
  comment: 'Tabela para cadastro de dados de transferência de item do estoque',
})
@Index(['transferDate', 'origin', 'destination'])
export class StockTransferEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'origin_id' })
  @Index()
  origin: StockLocationEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'destination_id' })
  @Index()
  destination: StockLocationEntity;

  @Column({
    type: 'timestamptz',
    name: 'transfer_date',
    comment: 'Data de transferência selecionada pelo usuário',
  })
  @Index()
  transferDate: Date;

  @OneToMany(() => StockTransferItemEntity, (item) => item.stockTransfer)
  items: StockTransferItemEntity[];
}
