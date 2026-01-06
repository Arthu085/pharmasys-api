import { BaseEntity } from 'src/core/database/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { EntryTypeEnum } from '../enums/entry-type.enum';

@Entity('entry_item_type', {
  comment: 'Tabela para cadastro dos tipos de entrada de item',
})
export class EntryItemTypeEntity extends BaseEntity {
  @Column({ length: 150, unique: true, comment: 'Nome dos tipos' })
  name: string;

  isInvoiceRequired(): boolean {
    if (this.name === EntryTypeEnum.NOTA_FISCAL) {
      return true;
    }
    return false;
  }
}
