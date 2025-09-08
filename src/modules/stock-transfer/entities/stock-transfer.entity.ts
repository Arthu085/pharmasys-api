import { BaseEntity } from 'src/common/entities/base.entity';
import { StockLocation } from 'src/modules/stock-location/entities/stock-location.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_transfer', {
  comment: 'Tabela para cadastro de dados de transferência de item do estoque',
})
export class StockTransfer extends BaseEntity {
  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'origin_id' })
  @Index()
  origin: StockLocation;

  @ManyToOne(() => StockLocation, { eager: true })
  @JoinColumn({ name: 'destination_id' })
  @Index()
  destination: StockLocation;

  @Column({
    type: 'timestamptz',
    name: 'transfer_date',
    comment: 'Data de transferência selecionada pelo usuário',
  })
  transferDate: Date;
}
