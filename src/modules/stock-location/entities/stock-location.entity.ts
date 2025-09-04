import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('stock_location', {
  comment: 'Tabela para cadastro de locais de estoque',
})
@Index(['name', 'code'])
export class StockLocation extends BaseEntity {
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
