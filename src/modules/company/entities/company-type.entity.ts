import { Column, Entity, ManyToMany } from 'typeorm';
import { Company } from './company.entity';
import { BaseEntity } from 'src/common/entites/base.entity';

@Entity('company_type', {
  comment: 'Tabela para cadastro dos tipos de empresa',
})
export class CompanyType extends BaseEntity {
  @Column({ length: 100, unique: true, comment: 'Nome dos tipos de empresa' })
  name: string;

  @ManyToMany(() => Company, (company) => company.companyTypes)
  companies: Company[];
}
