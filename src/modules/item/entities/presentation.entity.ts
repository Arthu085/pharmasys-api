import { BaseEntity } from 'src/common/entites/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('presentation', {
  comment: 'Tabela para cadastro de apresentações de item',
})
export class Presentation extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome da apresentação' })
  name: string;
}
