import { BaseEntity } from 'src/core/database';
import { Column, Entity } from 'typeorm';

@Entity('presentation', {
  comment: 'Tabela para cadastro de apresentações de item',
})
export class PresentationEntity extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome da apresentação' })
  name: string;
}
