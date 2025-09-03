import { BaseEntity } from 'src/common/entites/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { StatusEnum } from 'src/shared/enums/status.enum';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_location', {
  comment: 'Tabela para cadastro de locais de estoque',
})
@Index(['name', 'code'])
export class StockLocation extends BaseEntity {
  @Index()
  @Column({ length: 100, comment: 'Nome do local de estoque' })
  name: string;

  @Column({ length: 50, unique: true, comment: 'Código do local de estoque' })
  code: string;

  @Column({
    name: 'is_central_stock',
    type: 'boolean',
    default: false,
    comment: 'Verifica se é estoque central',
  })
  isCentralStock: boolean;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.A,
    name: 'stock_location_status',
    comment: 'Status do local de estoque',
  })
  @Index()
  stockLocationStatus: StatusEnum;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated: User;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated: User | null;
}
