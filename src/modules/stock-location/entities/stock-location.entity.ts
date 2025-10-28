import { BaseEntity } from 'src/core/database/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_location', {
  comment: 'Tabela para cadastro de locais de estoque',
})
@Index(['name', 'code'])
export class StockLocation extends BaseEntity {
  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_created_id' })
  userCreated?: User | null;

  @ManyToOne(() => User, { eager: true, nullable: true })
  @JoinColumn({ name: 'user_updated_id' })
  userUpdated?: User | null;

  @Column({ length: 100, comment: 'Nome do local de estoque' })
  @Index()
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
}
