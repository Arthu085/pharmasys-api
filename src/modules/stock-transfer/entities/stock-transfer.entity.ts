import { BaseEntity } from 'src/core/database/entities/base.entity';
import { StockLocationEntity } from 'src/modules/stock-location/entities/stock-location.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_transfer', {
  comment: 'Tabela para cadastro de dados de transferência de item do estoque',
})
export class StockTransferEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @ManyToOne(() => StockLocationEntity, { eager: true })
  @JoinColumn({ name: 'origin_id' })
  @Index()
  origin: StockLocationEntity;

  @ManyToOne(() => StockLocationEntity, { eager: true })
  @JoinColumn({ name: 'destination_id' })
  @Index()
  destination: StockLocationEntity;

  @Column({
    type: 'timestamptz',
    name: 'transfer_date',
    comment: 'Data de transferência selecionada pelo usuário',
  })
  transferDate: Date;
}
