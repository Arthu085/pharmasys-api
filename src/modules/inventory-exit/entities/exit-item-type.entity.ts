import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('exit_item_type', {
  comment: 'Tabela para cadastro dos tipos de saída de item',
})
export class ExitItemType extends BaseEntity {
  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;
}
