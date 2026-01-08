import { BaseEntity } from 'src/core/database/entities/base.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ExitItemTypeEntity } from './exit-item-type.entity';
import { UserEntity } from 'src/modules/user/domain/entities/user.entity';
import { StockLocationEntity } from 'src/modules/stock-location/domain/entities/stock-location.entity';
import { InventoryExitItemEntity } from './inventory-exit-item.entity';

@Entity('inventory_exit', {
  comment: 'Tabela para cadastro de dados de saída de item',
})
@Index(['exitDate', 'exitType', 'stockLocation'])
export class InventoryExitEntity extends BaseEntity {
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_created_id' })
  userCreated: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: UserEntity | null;

  @Column({
    type: 'timestamptz',
    name: 'exit_date',
    comment: 'Data de saída informada pelo usuário',
  })
  @Index()
  exitDate: Date;

  @ManyToOne(() => ExitItemTypeEntity)
  @JoinColumn({ name: 'exit_type_id' })
  @Index()
  exitType: ExitItemTypeEntity;

  @ManyToOne(() => StockLocationEntity)
  @JoinColumn({ name: 'stock_location_id' })
  @Index()
  stockLocation: StockLocationEntity;

  @Column({ type: 'text', comment: 'Anotações da saída' })
  notes: string;

  @OneToMany(() => InventoryExitItemEntity, (item) => item.inventoryExit)
  items: InventoryExitItemEntity[];
}
